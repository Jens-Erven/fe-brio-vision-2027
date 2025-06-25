import { jwtDecode } from "jwt-decode";

interface DecodedJWT {
    exp: number; // Expiration time (in seconds since Unix epoch)
}

/**
 * Configuration object for token-related operations.
 * 
 * @property {string} sp - The service provider identifier.
 * @property {string} o - Office
 * @property {string} so - Sub Office
 * @property {string} pi2TtOut - Specifies the token type output, e.g., 'JWTV1'.
 * @property {string} filter - A filter string used to include or exclude specific tokens
 *                             based on patterns. The filter supports:
 *                             - Inclusion patterns (e.g., `=:.+_SP100`)
 *                             - Exclusion patterns (e.g., `!=:.+_SP+`)
 */
export const tokenConfig = {
    sp: 'PI2/SP/Portima/Brio/Ibp/Next',
    o: '',
    so: '',
    pi2TtOut: 'JWTV1',
    filter: `=:.+_SP100;=:.+_SP400;=:.+_SP401;=:.+_SP402;=:.+_RT+;!=:.+_SP+`,
};

export class tokenService {
    async getToken(): Promise<string | null> {
        let token = sessionStorage.getItem(`token-${tokenConfig.o}-${tokenConfig.so}`);
        if (!token || this.isTokenExpired(token)) {
            token = null;
        }
        if (!token) {
            token = await this.requestToken();
            sessionStorage.setItem(`token-${tokenConfig.o}-${tokenConfig.so}`, token);
        }
        return token;
    }

    clearToken() {
        sessionStorage.removeItem(`token-${tokenConfig.o}-${tokenConfig.so}`);
    }

    private isTokenExpired(token: string): boolean {
        try {
            const decoded: DecodedJWT = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            return decoded.exp < currentTime;
        } catch (error) {
            console.error("Error decoding token:", error);
            return true;
        }
    }

    private async requestToken(): Promise<string> {
        const port = await this.getTcpPortFromWsk(`wss://127.0.0.1:10219/`);
        if (!port) {
            throw new Error('Authentication WSK server not found');
        }
        const token = await this.getTokenFromWsk(`wss://127.0.0.1:${port}`);
        if (!token) {
            throw new Error('Authentication failed, unable to get a token');
        }
        return token;
    }

    private getTcpPortFromWsk(serverUrl: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const wssWebSocket = new WebSocket(serverUrl);
            // Handle connection open
            wssWebSocket.onopen = () => {
                const xml = `<?xml version='1.0' encoding='utf-8' ?><req xmlns='http://www.portima.com/pki/identity/pi2/local/asweb/glob/gen' version='0.1' id='1' func='fTcpPortGet' dt='${new Date().toISOString()}'><header host='WS Browser'/><param goblVers='0.184'></param></req>`;

                wssWebSocket.send(xml);
            };
            // Handle message event
            wssWebSocket.onmessage = (event: MessageEvent) => {
                try {
                    const tcpPort = this.parseTcpPort(event.data);
                    if (tcpPort !== null) {
                        resolve(tcpPort); // Resolve the promise with the received data
                    } else {
                        reject(new Error('tcpPort is null'));
                    }
                } catch (error) {
                    console.error('Error parsing TCP port:', error);
                    reject(new Error(`Error parsing TCP port`));
                }

                wssWebSocket.close();
            };
            // Handle error event
            wssWebSocket.onerror = () => {
                reject(new Error('Unable to get token'));
            };
            // Handle close event
            wssWebSocket.onclose = (event) => {
                if (!event.wasClean) {
                    reject(new Error(`WebSocket closed unexpectedly. Code: ${event.code}, Reason: ${event.reason}`));
                }
            };
        });
    }

    private getTokenFromWsk(serverUrl: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const wssWebSocket = new WebSocket(serverUrl);
            // Handle connection open
            wssWebSocket.onopen = () => {
                const xml = `<?xml version="1.0" encoding="utf-8" ?><req xmlns="http://www.portima.com/pki/identity/pi2/local/asweb/sess/sso" version="0.1" id="1" func="fTokenGet" dt="${new Date().toISOString()}"><header host="WS Browser"/><param goblVers="0.184"><info sp="${tokenConfig.sp}" _o="${tokenConfig.o}" _so="${tokenConfig.so}"/><query><![CDATA[pi2.ttOut=${tokenConfig.pi2TtOut}&pi2.brio.filter=${btoa(tokenConfig.filter)}]]></query></param></req>`;
                // console.debug('Sending request:', xml);
                wssWebSocket.send(xml);
            };
            // Handle message event
            wssWebSocket.onmessage = (event: MessageEvent) => {
                try {
                    const token = this.getCDATAFromXML(event.data);
                    if (token !== null) {
                        resolve(token); // Resolve the promise with the received data
                    } else {
                        reject(new Error('Token is null'));
                    }
                    wssWebSocket.close();

                } catch (error) {
                    console.error('Error parsing token:', error);
                    reject(new Error(`Error parsing token`));
                }
            };
            // Handle error event
            wssWebSocket.onerror = () => {
                reject(new Error(`Error: Unable to get token`));
            };
            // Handle close event
            wssWebSocket.onclose = (event) => {
                if (!event.wasClean) {
                    reject(new Error(`WebSocket closed unexpectedly. Code: ${event.code}, Reason: ${event.reason}`));
                }
            };
        });
    }

    private parseTcpPort(xml: string): string | null {
        // Parse the XML string
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "application/xml");

        // Check for parsing errors
        const parseError = xmlDoc.getElementsByTagName("parsererror");
        if (parseError.length > 0) {
            throw new Error("Error parsing XML");
        }

        // Define the namespace and query the XML
        const namespace = "http://www.portima.com/pki/identity/pi2/local/asweb/glob/gen";
        const paramNode = xmlDoc.getElementsByTagNameNS(namespace, "info")[0];

        return paramNode?.getAttribute("tcpPort");
    }

    private getCDATAFromXML(xmlString: string) {
        // Parse the XML string
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "application/xml");

        // Check for parsing errors
        const parseError = xmlDoc.getElementsByTagName("parsererror");
        if (parseError.length > 0) {
            throw new Error("Error parsing XML");
        }

        if (xmlDoc.getElementsByTagName("error").length > 0) {
            const descr = xmlDoc.getElementsByTagName("descr")[0].textContent;
            if (descr !== "") {
                throw new Error(`Exception for WSK ${descr}`);
            }
            throw new Error(descr);
        }

        // Find the <param> element
        const paramElement = xmlDoc.getElementsByTagName("param")[0];
        if (!paramElement) {
            throw new Error("No <param> element found in the XML");
        }

        return paramElement.textContent;
    }
}
