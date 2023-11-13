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

## Why this guide bad

1. At the end he get ONLY auth with credentials with quality because it on `api/auth/signin` route with bad styling
   https://youtu.be/2kgqPvs0j_I?list=TLPQMTMxMTIwMjNGkfqJTqM-fA&t=2510
   I mean I can change styling but it comes out of the box and he didn't show how to change it - CoderOne showed but I got error after deploying
2. He might got error after deploying on vercel as I
