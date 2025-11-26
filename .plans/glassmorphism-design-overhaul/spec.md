# Plan: Glassmorphism Design Overhaul for Advent of Code 2025

## Overview
- **Created**: 2025-11-26
- **Goal**: Complete visual redesign from VS Code dark theme to modern glassmorphism aesthetic with particle effects, while preserving all existing functionality
- **Type**: refactoring
- **Estimated Complexity**: medium
  - ~20 files to modify with style changes, all straightforward CSS/component updates
  - 1 new component to create (ParticleBackground)
  - No logic changes, purely visual transformation
- **Confidence Level**: high
  - Design direction is clear (glassmorphism with specific requirements)
  - Tech stack is well-known (Tailwind, React, Next.js)
  - No integration complexity or unknown dependencies
  - Particle effects library is well-documented
- **Risk Tolerance**: aggressive
- **Prerequisites**: 
  - Node.js and Yarn installed
  - Next.js app running successfully
  - Current design is VS Code dark theme
- **Assumptions**:
  - Geist font family will be used (modern, clean, 2025 aesthetic)
  - tsparticles library for particle effects
  - All existing functionality must remain unchanged
  - Dark theme only (no light mode toggle)
  - Minimal animations (subtle hover states)

## Goals
- **Primary Goal**: Transform the visual design from VS Code dark theme to modern glassmorphism aesthetic with particle effects
- **Success Metrics**: 
  - All components have glassmorphic appearance (backdrop blur, semi-transparent backgrounds, soft glows)
  - Particle effects visible in background
  - All existing functionality works identically
  - Modern 2025 aesthetic achieved
  - Lint and typecheck pass
- **User Value**: 
  - More visually appealing, modern interface
  - Enhanced user experience with contemporary design trends
  - Maintains familiar functionality with improved aesthetics
- **Technical Benefits**: 
  - Updated design system in Tailwind config
  - Reusable glassmorphism utilities
  - Modern font stack
  - Improved visual hierarchy

## Success Criteria
- All puzzle cards have glassmorphic styling with backdrop blur
- Buttons and badges use glass aesthetic with subtle glows
- Particle effects animate in background
- All existing features work: running puzzles, viewing results, navigation, editing input
- Lint passes with no errors
- Typecheck passes with no errors
- Responsive design maintained across all breakpoints
- Accessibility preserved (focus states, ARIA attributes)

## Key Decisions
- **Design Style**: Glassmorphism chosen over other 2025 trends (brutalism, bento, minimalist luxury)
- **Color Palette**: Deep gradient mesh backgrounds (purple/blue/teal) with vibrant accents (cyan #00d4ff, purple #a855f7, neon green #10b981)
- **Typography**: Geist Sans for UI, Geist Mono for code/technical content (replaces Consolas/Monaco)
- **Animation Level**: Minimal - subtle hover transitions only, no complex animations
- **Particle Effects**: Using tsparticles library for background effects
- **Theme**: Dark only, no light mode toggle
- **Library Choices**:
  - `@tsparticles/react` + `@tsparticles/slim` for particle effects
  - `next/font/google` for Geist font loading
  - Existing Tailwind setup enhanced with new utilities

## Before State
### Current Structure
- **Design System**: VS Code dark theme aesthetic
  - Colors: Dark backgrounds (#1e1e1e, #252526, #2d2d30), muted text, blue accents (#007acc)
  - Typography: Monospace fonts (Consolas, Monaco, Menlo)
  - Style: Flat, minimal, code-editor inspired
  - Components: Solid backgrounds, simple borders, basic hover states
- **Components**:
  - PuzzleCard: Solid panel backgrounds with borders
  - Buttons: Simple styled buttons with blue accents
  - Badges: Solid backgrounds for status indicators
  - Footer: Plain text with links
- **Configuration**:
  - Tailwind: Custom VS Code color palette, monospace fonts
  - Global CSS: Basic utilities for buttons, badges, links

### Pain Points
- Dated VS Code aesthetic (not trending in 2025)
- Flat, uninspiring visual design
- Limited depth and visual interest
- Monospace fonts everywhere (not ideal for all content)
- No background effects or visual flair

## After State
### New Structure
- **Design System**: Modern glassmorphism aesthetic
  - Colors: Deep gradient backgrounds, vibrant accents, semi-transparent surfaces
  - Typography: Geist Sans (UI), Geist Mono (code/technical)
  - Style: Layered depth, frosted glass effects, soft glows
  - Components: Backdrop blur, transparency, subtle animations
- **Components**:
  - ParticleBackground: New component wrapping app with animated particles
  - PuzzleCard: Glass panels with backdrop blur and glowing borders
  - Buttons: Glass effect with hover glows
  - Badges: Glass with colored glows matching status
  - Footer: Glass treatment with improved spacing
- **Configuration**:
  - Tailwind: New gradient backgrounds, glass utilities, expanded color palette
  - Global CSS: Glassmorphism utilities, gradient backgrounds
  - Fonts: Geist loaded via next/font

### Improvements
- Modern, trending 2025 aesthetic
- Increased visual depth and interest
- Beautiful particle effects in background
- Improved typography hierarchy
- Professional, polished appearance
- Enhanced user engagement through visual appeal

## Technical Details

### Design System (high consequence)
**Color Palette**:
```javascript
// Tailwind config colors
colors: {
  glass: {
    bg: 'rgba(17, 25, 40, 0.75)',          // Main glass background
    border: 'rgba(255, 255, 255, 0.1)',    // Glass borders
    hover: 'rgba(255, 255, 255, 0.05)',    // Hover state
  },
  accent: {
    cyan: '#00d4ff',      // Primary accent
    purple: '#a855f7',    // Secondary accent
    green: '#10b981',     // Success accent
  },
  gradient: {
    from: '#667eea',      // Gradient start (purple)
    via: '#764ba2',       // Gradient middle
    to: '#f093fb',        // Gradient end (pink)
  }
}
```

**Typography**:
- Primary font: Geist Sans (body, headings, UI)
- Monospace font: Geist Mono (code, results, technical content)
- Font scale remains similar to current, adjusted for new typeface

**Glassmorphism Utilities**:
```css
.glass-panel {
  background: rgba(17, 25, 40, 0.75);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.glass-button {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
}
```

### Particle Configuration (medium consequence)
```javascript
// ParticleBackground config
{
  particles: {
    number: { value: 50 },
    color: { value: ["#667eea", "#764ba2", "#f093fb"] },
    shape: { type: "circle" },
    opacity: {
      value: 0.3,
      animation: { enable: true, speed: 0.5 }
    },
    size: {
      value: 3,
      random: true
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      outModes: "bounce"
    }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" }
    }
  }
}
```

### Component Patterns (medium consequence)
- All cards: Apply `.glass-panel` base + custom refinements
- All buttons: Apply `.glass-button` base + accent colors on hover
- All badges: Glass background + colored glow matching status
- Layout: Particle background as outermost wrapper in _app.tsx

## Files to Modify

### Configuration Files
1. `package.json` - Add dependencies
2. `tailwind.config.js` - New color system, utilities, fonts
3. `styles/globals.css` - Glassmorphism utilities, gradient backgrounds
4. `pages/_document.tsx` - Font loading setup

### New Components
5. `components/ParticleBackground.tsx` - Particle effects wrapper

### Existing Components (all need style updates)
6. `components/ViewAllPuzzles.tsx` - Background integration
7. `components/ViewSinglePuzzle.tsx` - Background integration
8. `components/PuzzleCard.tsx` - Glass panel styling
9. `components/Footer.tsx` - Glass footer styling
10. `components/buttons/PuzzleCardButtonGroup.tsx` - Glass buttons + dropdown
11. `components/buttons/RunPartButton.tsx` - Glass button
12. `components/buttons/RunDayButton.tsx` - Glass button
13. `components/buttons/RunAllButton.tsx` - Glass button
14. `components/buttons/ShowAllButton.tsx` - Glass button
15. `components/buttons/EditInputButton.tsx` - Glass button
16. `components/puzzlePart/PuzzlePartRow.tsx` - Glass row styling
17. `components/puzzlePart/PuzzlePartStatus.tsx` - Glass badge with glow
18. `components/puzzlePart/PuzzlePartResult.tsx` - Typography update
19. `components/puzzlePart/PuzzlePartTime.tsx` - Typography update

### Storybook Files (if updating)
20. All `*.stories.tsx` files - May need background adjustments for visual testing

## Code Snippets

### ParticleBackground Component
```typescript
'use client';
import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: { value: "transparent" },
        },
        fpsLimit: 60,
        particles: {
          number: { value: 50, density: { enable: true, width: 1920, height: 1080 } },
          color: { value: ["#667eea", "#764ba2", "#f093fb"] },
          shape: { type: "circle" },
          opacity: {
            value: { min: 0.1, max: 0.3 },
            animation: { enable: true, speed: 0.5, sync: false }
          },
          size: {
            value: { min: 1, max: 3 },
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            outModes: { default: "bounce" },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
          },
          modes: {
            grab: { distance: 140, links: { opacity: 0.2 } },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 -z-10"
    />
  );
};

export default ParticleBackground;
```

### Tailwind Config - Colors Section
```javascript
colors: {
  // Glass system
  glass: {
    'bg': 'rgba(17, 25, 40, 0.75)',
    'bg-light': 'rgba(255, 255, 255, 0.05)',
    'border': 'rgba(255, 255, 255, 0.1)',
    'border-light': 'rgba(255, 255, 255, 0.18)',
    'hover': 'rgba(255, 255, 255, 0.05)',
  },
  // Accent colors
  accent: {
    cyan: {
      DEFAULT: '#00d4ff',
      glow: 'rgba(0, 212, 255, 0.3)',
    },
    purple: {
      DEFAULT: '#a855f7',
      glow: 'rgba(168, 85, 247, 0.3)',
    },
    green: {
      DEFAULT: '#10b981',
      glow: 'rgba(16, 185, 129, 0.3)',
    },
  },
  // Status colors (vibrant versions)
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#06b6d4',
  },
}
```

### Global CSS - Glassmorphism Utilities
```css
@layer utilities {
  .glass-panel {
    @apply bg-glass-bg backdrop-blur-xl border border-glass-border;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  }
  
  .glass-button {
    @apply bg-glass-bg-light backdrop-blur-md border border-glass-border;
    @apply transition-all duration-200 ease-in-out;
  }
  
  .glass-button:hover {
    @apply bg-glass-hover border-glass-border-light;
    box-shadow: 0 0 20px var(--glow-color, rgba(0, 212, 255, 0.3));
  }
  
  .glass-badge {
    @apply glass-panel backdrop-blur-md;
  }
  
  .gradient-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  }
  
  .glow-cyan {
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  }
  
  .glow-purple {
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
  }
  
  .glow-green {
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
  }
}
```

## Documentation Impact
- **Code documentation**: No inline documentation changes needed (visual-only changes)
- **README changes**: Could add a "Design" section mentioning glassmorphism aesthetic, but not required for this implementation
- **API documentation**: Not applicable (no API changes)
- **User guides**: Not applicable (functionality unchanged)

Note: Documentation updates are minimal since this is purely a visual redesign with no functional changes.

## Notes from Discussion
- User wants complete overhaul, happy to redesign entire site
- Glassmorphism was chosen from multiple 2025 design trend options
- Dark theme only (no light mode)
- Minimal animations preferred (subtle hover states)
- Particle effects specifically requested as special feature
- Typography choice left to implementer - Geist chosen for modern 2025 aesthetic
- All existing functionality must be preserved

## Execution Plan

### Step 1: Install Dependencies and Setup
**Intent**: Add required packages for glassmorphism effects and modern typography
**Complexity**: simple
**Type**: implementation
- [ ] Install tsparticles: `yarn add @tsparticles/react @tsparticles/slim`
- [ ] Add Geist font import to `pages/_document.tsx`
- [ ] Verify installations successful
**Implementation Notes**:
- Use latest stable versions of tsparticles
- Geist font will be loaded via next/font/google
**Dependencies**: None
**Verification**: Packages appear in package.json, no installation errors

### Step 2: Update Design System (Tailwind + CSS)
**Intent**: Establish glassmorphism design system foundation with colors, utilities, and effects
**Complexity**: medium
**Type**: implementation
- [ ] Update `tailwind.config.js` with new color palette (glass, accent, status colors)
- [ ] Remove old vscode color palette completely
- [ ] Update font configuration (Geist Sans, Geist Mono) - replace font-vscode
- [ ] Add glassmorphism utilities to `styles/globals.css` (.glass-panel, .glass-button, .glass-badge, glow utilities)
- [ ] Add gradient background styles to globals.css
- [ ] Update body background to use gradient (replace current bg-zinc-900)
- [ ] Update .btn-defaults to use glass-button styling
- [ ] Update .badge-defaults to use glass-badge styling
- [ ] Update .a-defaults to use accent-cyan and glass hover effects
**Implementation Notes**:
- Remove old VS Code color palette (vscode.*)
- Replace font-vt323 class with new Geist font classes
- Replace bg-zinc-900 with gradient background
- Keep existing Tailwind plugins (@tailwindcss/forms)
- Backdrop-filter is supported by default in Tailwind 3.2.4
- Primary buttons (RunAllButton, ShowAllButton) need special glass styling with solid accent background
- Modal dialogs and dropdown menus need glass treatment
**Dependencies**: Step 1 complete
**Verification**: Tailwind builds without errors, new utilities available in dev tools

### Step 3: Create ParticleBackground Component
**Intent**: Add animated particle effects to background for visual interest
**Complexity**: simple
**Type**: implementation
- [ ] Create `components/ParticleBackground.tsx`
- [ ] Implement particle configuration (50 particles, gradient colors, subtle animation)
- [ ] Add interactivity on hover (grab mode)
- [ ] Style as absolute positioned, z-index -10
- [ ] Export component
**Implementation Notes**:
- Use code snippet from Technical Details section
- Particles should be subtle, not distracting
- Colors match gradient theme (purple, violet, pink)
**Dependencies**: Step 1 complete
**Verification**: Component renders without errors, particles visible in Storybook or dev environment

### Step 4: Update Layout and Background Integration
**Intent**: Integrate particle background into app layout
**Complexity**: simple
**Type**: implementation
- [ ] Update `pages/_document.tsx` to use Geist fonts (replace font-vt323 class)
- [ ] Update `pages/_document.tsx` body background (replace bg-zinc-900 with gradient)
- [ ] Update `components/ViewAllPuzzles.tsx` to include ParticleBackground
- [ ] Update `components/ViewSinglePuzzle.tsx` to include ParticleBackground
- [ ] Ensure particle layer is behind all content
**Implementation Notes**:
- Replace font-vt323 with Geist font class in body
- Replace bg-zinc-900 with gradient background class in body
- ParticleBackground should be direct child of layout wrapper
- Use relative positioning on parent to establish stacking context
- Gradient background as fallback for particles
**Dependencies**: Steps 2 and 3 complete
**Verification**: Particles visible on all pages, content layers correctly, Geist fonts loading, gradient background visible

### Step 5: Update PuzzleCard Component
**Intent**: Transform main puzzle card to glassmorphic design
**Complexity**: simple
**Type**: refactoring
- [ ] Update `components/PuzzleCard.tsx` with glass-panel styling
- [ ] Replace solid backgrounds with glass-bg
- [ ] Add backdrop-blur to card container
- [ ] Update borders to glass-border
- [ ] Add subtle shadow
- [ ] Ensure all child elements visible against new background
**Implementation Notes**:
- Main card container gets .glass-panel
- Header section may need slightly lighter glass for contrast
- Test with both hideLink states
**Dependencies**: Step 2 complete
**Verification**: Cards have frosted glass appearance, content readable, shadows visible

### Step 6: Update All Button Components
**Intent**: Apply glass effect to all interactive buttons
**Complexity**: medium
**Type**: refactoring
- [ ] Update `components/buttons/RunPartButton.tsx` - use updated btn-defaults (now glass-button)
- [ ] Update `components/buttons/RunDayButton.tsx` - use updated btn-defaults (now glass-button)
- [ ] Update `components/buttons/RunAllButton.tsx` - special primary glass styling with solid accent background
- [ ] Update `components/buttons/ShowAllButton.tsx` - special primary glass styling with solid accent background
- [ ] Update `components/buttons/EditInputButton.tsx` - use updated btn-defaults, glass modal dialog
- [ ] Update `components/buttons/PuzzleCardButtonGroup.tsx` - glass dropdown menu styling
- [ ] Add appropriate glow colors on hover (cyan for run, purple for edit)
- [ ] Ensure disabled states work with glass effect
**Implementation Notes**:
- btn-defaults now uses glass-button styling (updated in Step 2)
- RunAllButton and ShowAllButton get special primary styling (solid accent bg with glass effect)
- EditInputButton modal panel and overlay need glass treatment
- PuzzleCardButtonGroup Menu.Items needs glass-panel styling
- Add custom glow color via CSS variable or direct class
- Focus states should be visible with glass
**Dependencies**: Step 2 complete
**Verification**: All buttons have glass appearance, hover glows work, disabled states clear, modals and dropdowns have glass styling

### Step 7: Update Status Badge Components
**Intent**: Transform status badges to glass with colored glows
**Complexity**: simple
**Type**: refactoring
- [ ] Update `components/puzzlePart/PuzzlePartStatus.tsx`
- [ ] Use updated badge-defaults (now glass-badge from Step 2)
- [ ] Replace sky-400 with accent-cyan for queued status
- [ ] Add colored glows matching status (green for success, red for error, yellow for warning, cyan for queued)
- [ ] Ensure icons and text visible
- [ ] Test all status states (idle, running, queued, success, error)
**Implementation Notes**:
- badge-defaults now uses glass-badge styling (updated in Step 2)
- Success badge: badge-defaults + glow-green
- Error badge: badge-defaults + glow effect with red
- Warning badge: badge-defaults + glow effect with yellow
- Queued badge: badge-defaults + glow-cyan (replace sky-400 with accent-cyan)
- Idle badge: badge-defaults, no glow
**Dependencies**: Step 2 complete
**Verification**: All status states have appropriate glass + glow, text readable, queued uses accent-cyan

### Step 8: Update Puzzle Part Row and Results
**Intent**: Apply glass styling to puzzle part rows and update typography
**Complexity**: simple
**Type**: refactoring
- [ ] Update `components/puzzlePart/PuzzlePartRow.tsx` - glass background on row
- [ ] Update `components/puzzlePart/PuzzlePartResult.tsx` - typography improvements
- [ ] Update `components/puzzlePart/PuzzlePartTime.tsx` - typography improvements
- [ ] Ensure grid layout works with glass backgrounds
- [ ] Update text colors for readability on glass
**Implementation Notes**:
- Row background: subtle glass effect, lighter than card
- Results and time use Geist Mono for technical content
- Test with various result types (numbers, strings, null)
**Dependencies**: Steps 2 and 7 complete
**Verification**: Rows have glass appearance, all content readable, layout intact

### Step 9: Update Footer Component
**Intent**: Apply glass treatment to footer
**Complexity**: simple
**Type**: refactoring
- [ ] Update `components/Footer.tsx` with glass styling
- [ ] Add glass panel background
- [ ] Update link colors to accent-cyan
- [ ] Ensure heart icon and text visible
- [ ] Add subtle glow to links on hover
**Implementation Notes**:
- Footer gets glass-panel with extra padding
- Links use accent-cyan color
- Heart icon remains red but may need brightness adjustment
**Dependencies**: Step 2 complete
**Verification**: Footer has glass appearance, links readable and hover nicely

### Step 10: Update Header and Typography
**Intent**: Ensure headers and body text use new font system
**Complexity**: simple
**Type**: refactoring
- [ ] Update header styles in `components/ViewAllPuzzles.tsx`
- [ ] Update header styles in `components/ViewSinglePuzzle.tsx`
- [ ] Ensure h1, h2, h3 use Geist Sans
- [ ] Ensure code/technical content uses Geist Mono
- [ ] Update accent color on headings to accent-cyan or accent-purple
**Implementation Notes**:
- Heading color: accent-cyan or gradient
- Body text: white/off-white
- Links: accent-cyan with glow on hover
**Dependencies**: Step 2 complete
**Verification**: All typography renders in Geist fonts, hierarchy clear

### Step 11: Test All Functionality
**Intent**: Verify all existing functionality preserved
**Complexity**: simple
**Type**: testing
- [ ] Test running individual puzzle parts
- [ ] Test running full day puzzles
- [ ] Test running all puzzles
- [ ] Test editing input functionality
- [ ] Test navigation between pages
- [ ] Test dropdown menus
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test keyboard navigation
- [ ] Verify all status states display correctly
**Implementation Notes**:
- Use actual puzzle data for testing
- Test across different browsers if possible
- Check console for errors
**Dependencies**: Steps 1-10 complete
**Verification**: All features work identically to before, no functionality broken

### Step 12: Run Quality Checks
**Intent**: Ensure code quality standards maintained
**Complexity**: simple
**Type**: testing
- [ ] Run `yarn lint` - fix any errors
- [ ] Run `yarn build` - ensure build succeeds
- [ ] Check for TypeScript errors
- [ ] Review for any accessibility regressions
- [ ] Test with keyboard only (tab navigation, focus states)
**Implementation Notes**:
- Fix any linting errors related to new code
- Ensure no TypeScript errors introduced
- Focus states should be visible with glass effects
**Dependencies**: Step 11 complete
**Verification**: Lint passes, build succeeds, no type errors, accessibility maintained

## Deviation Handling Protocol

### When executing this plan, if you encounter:

**Minor deviations** (auto-fix, affects only current line/block):
- Exact rgba values for glass effects (can adjust for better appearance)
- Font weight choices (400 vs 500 for body text)
- Exact glow spread values
- Padding/margin micro-adjustments
- Import order optimization
→ **Action**: Fix and document in execution summary

**Medium deviations** (document assumptions, affects current component/file):
- Choosing between backdrop-blur values (8px vs 12px)
- Additional glass variations needed (glass-panel-light, glass-panel-dark)
- Color palette adjustments for better contrast
- Adding intermediate color shades
- Particle count or animation speed tuning
- Additional utility classes needed
→ **Action**: Implement best practice solution and document assumption with rationale

**Major deviations** (stop & confirm, cross-component impact):
- Geist font not available or causing issues (need alternative font)
- tsparticles causing performance issues (need to adjust or replace)
- Glass effects not rendering in certain browsers (need fallbacks)
- Accessibility issues with glass + text contrast (need to adjust opacity/colors)
- Breaking changes in component structure needed
- Responsive design issues requiring layout changes
→ **Action**: Stop execution, explain the issue, propose solution, wait for confirmation

### Documentation Requirements
When deviating from plan, always:
1. Note what wasn't covered in original plan
2. Explain why the deviation is necessary
3. Document the solution chosen and rationale
4. Log the deviation in execution-log.md
5. Assess downstream impact on remaining steps

## Review Checklist
- [ ] All components have glassmorphic appearance
- [ ] Particle effects working and visible
- [ ] Geist fonts loaded and applied correctly
- [ ] All buttons have glass effect with hover glows
- [ ] All badges have glass effect with status-colored glows
- [ ] Gradient background visible
- [ ] All functionality preserved (run parts, run day, run all, edit input, navigation)
- [ ] Responsive design working (mobile, tablet, desktop)
- [ ] Accessibility maintained (focus states, keyboard navigation, ARIA)
- [ ] Lint passing
- [ ] Build succeeds
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Performance acceptable (particles not causing lag)
