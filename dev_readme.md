## Problem

Auth form

## Solution

Do it here

## Live demo - performance - 99 mobile / 95 desktop

https://acc2-auth-form-next-supabase-2.vercel.app/

## Codesandbox

link should be here

## Github

link should be here

## Usage

use supabaseServer like this (to prevent build error - https://github.com/vercel/next.js/issues/56630)

```tsx
const user = await supabaseServer().auth.getUser()
```

## Implementation

### Step 1 - implement button modal and input

Implement button - https://codesandbox.io/p/sandbox/button-as-universal-component-jyfyg4
Implement modal - https://codesandbox.io/p/sandbox/modals-next-solved-jz5cfz
Implement input-validation-react-hook-form - https://codesandbox.io/p/sandbox/input-validation-react-hook-form-solved-ndklv3

### Step 2 - copy paste (auth) folder

### Step 3 - copy paste Checkbox.tsx and styles for it

## Step 4 - copy paste AuthModal.tsx and FormInput.tsx

And adjust imports for Button.tsx Checkbox.tsx and ModalContainer.tsx
That's it - if you implemented modal you already have button to open your auth modal

https://www.youtube.com/watch?v=cm-7RmD8yKQ

## Why this guide bad

1. He use white bg and its pain for my eyes (thanks for kali linux and redshift and screen that let's me reduce screen brightness)
2. He didn't show how to fix error that I got after deploying on vercel - https://github.com/nextauthjs/next-auth/issues/9132
