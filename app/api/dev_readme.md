## Returning errors

### On server

```ts
  } catch (error: any) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
  }
```

### On client

```tsx
 } catch (error) {
      if (error instanceof Error && error.message === "New password should be different from the old password.") {
        displayResponseMessage(<p className="text-danger">Its already your password - enter new one</p>)
        //This is required to show custom error message (check api/auth/recover/route.ts)
      } else if (error instanceof AxiosError) {
        displayResponseMessage(<p className="text-danger">{error.response?.data.error}</p>)
      } else {
```

## If error in headers (browser searchbar)

usually its error that you got when user click on invalid or expired link
You not handle this that's why I created state in /error/page.tsx
Below you see example if you handle error (you know what error message and why this error happened)

## On server

```ts
const error_description = encodeURIComponent("No user found after exchanging cookies for recovering")
return NextResponse.redirect(`${requestUrl.origin}/error?error_description=${error_description}`)
```

## On client

```ts
  const error_description = useSearchParams().get("error_description")

if (error_description === "No user found after exchanging cookies for registration") {
    return <ExchangeCookiesError message="No user found after exchanging cookies for registration" />
  }
```
