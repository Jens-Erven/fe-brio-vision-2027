# Protecting Custom shadcn/ui Components

This document outlines strategies to prevent your customized shadcn/ui components from being overwritten when running `npx shadcn@latest add` commands.

## Problem

When you customize shadcn/ui components in `@/components/ui/`, running the shadcn CLI commands can overwrite your customizations without warning.

## Solutions Implemented

### Strategy 1: Custom Extension Components (Recommended)

**Files created:**

- `src/components/ui/custom-badge.tsx` - Extended badge with `premium` variant
- `src/components/ui/custom-button.tsx` - Enhanced button with improved styling
- `src/components/ui/index.ts` - Centralized exports

**How it works:**

1. Create new files with `custom-` prefix for your modified components
2. Import your custom components by default through the index file
3. Keep original shadcn components available as `ShadcnBadge`, `ShadcnButton`, etc.

**Benefits:**

- ✅ Original shadcn components remain untouched
- ✅ Can run `npx shadcn@latest add` without fear
- ✅ Easy to switch between custom and standard versions
- ✅ Clear separation of concerns

**Usage:**

```tsx
// This will use your custom components
import { Badge, Button } from "@/components/ui";

// This will use the original shadcn components
import { ShadcnBadge, ShadcnButton } from "@/components/ui";
```

### Strategy 2: Version Control Protection

**Steps:**

1. Always commit your customizations before running shadcn commands
2. Use git to track changes and restore if needed
3. Create backup branches for important customizations

**Commands:**

```bash
# Before running shadcn commands
git add src/components/ui/
git commit -m "Save custom component modifications"

# After accidentally overwriting
git checkout HEAD~1 -- src/components/ui/badge.tsx
```

### Strategy 3: Component Library Approach

**Future consideration:**
Create your own component library package that extends shadcn components, allowing for:

- Version control of customizations
- Distribution across projects
- Clear API for extensions

## Best Practices

1. **Always use Strategy 1** for any significant customizations
2. **Document your changes** in component comments
3. **Test both versions** to ensure compatibility
4. **Regular backups** of your ui folder
5. **Team communication** about custom components

## Your Custom Features

### Custom Badge Variants

- `premium`: Gradient gold styling with hover effects

### Custom Button Enhancements

- Enhanced focus states with ring styling
- Improved dark mode support
- Better accessibility features
- Refined transition effects

## Migration Guide

If you want to switch from modified originals to the custom component approach:

1. Your customizations are now in `custom-badge.tsx` and `custom-button.tsx`
2. Update imports to use the index file: `import { Badge, Button } from "@/components/ui"`
3. Your original files can be restored with: `npx shadcn@latest add badge button`
4. Both versions remain available for comparison

## Commands to Avoid Issues

```bash
# Safe: Add new components
npx shadcn@latest add dialog

# Potentially dangerous: Re-adding existing customized components
npx shadcn@latest add badge  # Will overwrite your custom badge.tsx

# Safe with our approach: Original files can be overwritten
npx shadcn@latest add badge  # Won't affect custom-badge.tsx
```
