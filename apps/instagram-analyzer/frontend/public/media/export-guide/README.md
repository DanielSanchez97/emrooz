# Export-guide media

Drop screenshots and screen recordings for the "How to export" page in this
folder. Vite serves everything in `public/` at the site root, so a file placed
at `public/media/export-guide/01-settings.png` is reachable in the browser
at `/media/export-guide/01-settings.png`.

## Expected files

`src/pages/HowToExport.tsx` references these filenames by default. Name your
files to match, or edit the `steps` array in that file to point at whatever
you actually captured.

| Step | Filename                       | What to capture |
|------|--------------------------------|-----------------|
| 1    | `01-settings.png`              | Instagram app → Settings entry point |
| 2    | `02-accounts-center.png`       | Accounts Center screen |
| 3    | `03-your-information.png`      | "Your information and permissions" screen |
| 4    | `04-download-your-info.png`    | "Download your information" screen |
| 5    | `05-request-type.png`          | Choosing "Some of your information" |
| 6    | `06-select-connections.png`    | Selecting "Followers and following" under Connections |
| 7    | `07-format-and-submit.png`     | Choosing JSON format + submitting the request |
| 8    | `08-extract-archive.png`       | Extracting the .zip once it arrives |

## Formats

- Screenshots: `.png`, `.jpg`, `.webp`
- Recordings: `.mp4`, `.webm`, or `.gif`

Video files are embedded with `<video controls>`; if you prefer GIFs (no
controls, auto-loop), just use a `.gif` and swap the `<img>` / `<video>` tag in
the step definition.

## Privacy

Make sure no personal data is visible in the screenshots — blur or crop
anything that shouldn't be public. These files are committed to git.
