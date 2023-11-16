## Usage for callback folder

### Usage for callback/credentials/route.ts

This route required for case when user click 'verify email' button on email (e.g gmail.com)
In this route I:

1. Throw error if supabase throw error with #
2. If `code` I exchange this code to get cookies session (to use session data to update row)
3. Update row when user confirmed email
4. Trigger pusher event that show message like 'Authentication completed - thank you'

### Usage for callback/oauth/route.ts

1. Throw error if supabase throw error (usualy supabase add # that's why I use query param)
2. If `code` I exchange this code to get cookies session (to use session data for 3 4 5)
3. Insert row if user doesn't exist (if user exist I don't throw error - I just skip this step)
   because it shouldn't work like - I login with google - I logout - I login again with google and got error 'usex already exists'
4. Add one more provider if user login with new provider and with the same email for that provider
   For example:I login with google email1 - I logout - I login with twitter email1 - I add one more provider
   to show more relevant error like 'You already have account with this email - login with `google` or `twitter`'
5. Replace avatar url if user have no avatar
   For case when user login with credentials - logout - login with google

This route required for case when user click 'continue with google' or 'continue with twitter' button

## Usage for completed folder

## Usage for recover folder
