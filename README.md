# Wedding Website

A simple, elegant static wedding website with easy theme customization and mobile-first responsive design.

## Features

- **Minimal Dependencies**: Pure HTML, CSS, and vanilla JavaScript (if needed)
- **Easy Theming**: Change colors, fonts, and spacing by editing `config.json`
- **Mobile-First Design**: Optimized for mobile devices with progressive enhancement for desktop
- **Local Assets**: All fonts and images stored locally (after production setup)
- **GitHub Pages Ready**: Easy deployment with custom domain support

## Project Structure

```
wangshiwedding/
├── index.html              # Main HTML file
├── config.json            # Theme configuration (edit this to customize)
├── styles/
│   ├── variables.css      # CSS custom properties (fallback)
│   └── main.css           # Main stylesheet
├── assets/
│   ├── fonts/             # Local font files (add fonts here for production)
│   └── images/            # Add your images here
└── README.md              # This file
```

## Quick Start

1. **Open the site locally**: Simply open `index.html` in your web browser
2. **Add your content**: Edit `index.html` to add your wedding details
3. **Customize the theme**: Edit `config.json` to change colors, fonts, and spacing
4. **Add images**: Place your images in `assets/images/` and reference them in HTML

## Customizing the Theme

All theme customization is done through `config.json`. Simply edit the values and refresh your browser.

### Colors

```json
"colors": {
  "background": "#ffffff",    // Main background color
  "text": "#333333",          // Main text color
  "accent": "#d4af37",        // Accent color (headings, highlights)
  "secondary": "#f5f5f5"      // Secondary background (header, footer)
}
```

### Typography

```json
"typography": {
  "primaryFont": "Playfair Display",  // Font for headings
  "secondaryFont": "Lato",            // Font for body text
  "headingSize": "2.5rem",           // Base heading size
  "bodySize": "1rem"                 // Base body text size
}
```

### Spacing

```json
"spacing": {
  "sectionPadding": "4rem",          // Padding between sections (desktop)
  "contentMaxWidth": "1200px"        // Maximum width of content area
}
```

**Note**: Changes to `config.json` require a page refresh. The configuration is loaded when the page loads.

## Font Setup

### Development (Current Setup)

The site currently uses Google Fonts via CDN links in `index.html`. This is fine for development and testing.

### Production (Local Fonts)

Before deploying to production, you should download and use local fonts for better performance and to meet the "all assets local" requirement.

#### Step 1: Download Fonts

1. Visit [Google Fonts](https://fonts.google.com/)
2. Search for your fonts (e.g., "Playfair Display" and "Lato")
3. Select the font weights you need (typically 300, 400, 600, 700)
4. Click "Download family" or use a tool like [google-webfonts-helper](https://gwfh.mranftl.com/fonts)

#### Step 2: Add Fonts to Project

1. Create font files in `assets/fonts/` directory
2. Organize by font family:
   ```
   assets/fonts/
   ├── playfair-display/
   │   ├── playfair-display-v30-latin-regular.woff2
   │   ├── playfair-display-v30-latin-600.woff2
   │   └── playfair-display-v30-latin-700.woff2
   └── lato/
       ├── lato-v24-latin-300.woff2
       ├── lato-v24-latin-400.woff2
       └── lato-v24-latin-700.woff2
   ```

#### Step 3: Update CSS

Add `@font-face` declarations to `styles/variables.css` or create a new `styles/fonts.css` file:

```css
@font-face {
  font-family: 'Playfair Display';
  src: url('../assets/fonts/playfair-display/playfair-display-v30-latin-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Playfair Display';
  src: url('../assets/fonts/playfair-display/playfair-display-v30-latin-600.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

/* Add more @font-face rules for other weights and fonts */
```

#### Step 4: Remove Google Fonts CDN

Comment out or remove the Google Fonts `<link>` tags from `index.html`:

```html
<!-- Remove or comment out these lines -->
<!-- <link rel="preconnect" href="https://fonts.googleapis.com"> -->
<!-- <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> -->
<!-- <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet"> -->
```

## Adding Images

1. Place your images in the `assets/images/` directory
2. Reference them in your HTML:
   ```html
   <img src="assets/images/your-photo.jpg" alt="Description" loading="lazy">
   ```
3. **Optimize images**: For better performance, especially on mobile:
   - Use tools like [ImageOptim](https://imageoptim.com/) (Mac) or [Squoosh](https://squoosh.app/) (web)
   - Aim for file sizes under 500KB per image
   - Use appropriate formats (JPEG for photos, PNG for graphics with transparency)

## Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it (e.g., `wedding-website`)
3. **Do not** initialize with README, .gitignore, or license (you already have files)

### Step 2: Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial wedding website"

# Add your GitHub repository as remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/wedding-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Your site will be available at: `https://YOUR_USERNAME.github.io/wedding-website/`

**Note**: It may take a few minutes for the site to be available.

## Setting Up Custom Domain

### Step 1: Configure GitHub Pages Custom Domain

1. In your repository, go to **Settings** → **Pages**
2. Under **Custom domain**, enter your domain (e.g., `www.yourdomain.com` or `yourdomain.com`)
3. Check **Enforce HTTPS** (after DNS is configured)
4. GitHub will create a `CNAME` file in your repository (or you can create it manually)

### Step 2: Configure DNS at Your Domain Registrar

The DNS configuration depends on whether you want to use `www` subdomain, root domain, or both.

#### Option A: Using `www` Subdomain (Recommended - Easier)

1. Log into your domain registrar (where you bought the domain)
2. Go to DNS management
3. Add a **CNAME record**:
   - **Name/Host**: `www`
   - **Value/Target**: `YOUR_USERNAME.github.io` (replace with your GitHub username)
   - **TTL**: 3600 (or default)

#### Option B: Using Root Domain (yourdomain.com)

1. Add **A records** (4 records total):
   - **Name/Host**: `@` (or leave blank, depending on registrar)
   - **Value/Target**: `185.199.108.153`
   - **TTL**: 3600
   
   Repeat for these IPs:
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

2. (Optional) Also add a CNAME for `www` → `YOUR_USERNAME.github.io`

#### Option C: Using Both (www and root domain)

1. Follow Option B for root domain (A records)
2. Add CNAME for `www` → `YOUR_USERNAME.github.io`

### Step 3: Wait for DNS Propagation

- DNS changes can take anywhere from a few minutes to 48 hours
- You can check propagation status at [whatsmydns.net](https://www.whatsmydns.net/)
- Once DNS is propagated, GitHub will automatically detect and configure HTTPS

### Step 4: Verify and Enable HTTPS

1. After DNS propagates (usually within a few hours), go back to **Settings** → **Pages**
2. You should see a message that your domain is verified
3. Check **Enforce HTTPS** to enable SSL certificate
4. Your site will now be available at `https://yourdomain.com`

### Common DNS Issues

- **"Domain not verified"**: Wait longer for DNS propagation (can take up to 48 hours)
- **HTTPS not available**: DNS must fully propagate before GitHub can issue SSL certificate
- **Site not loading**: Check that your DNS records are correct and propagated

## Testing

### Local Testing

1. Open `index.html` in your browser
2. Test different screen sizes using browser DevTools:
   - Chrome/Edge: F12 → Toggle device toolbar (Ctrl+Shift+M)
   - Firefox: F12 → Responsive Design Mode (Ctrl+Shift+M)
   - Safari: Develop → Enter Responsive Design Mode

### Mobile Testing (Critical)

Since most visitors will view on mobile, test on actual devices:

1. **iOS**: Use Safari on iPhone/iPad
2. **Android**: Use Chrome on Android device
3. Test:
   - Touch interactions (buttons, links)
   - Image loading performance
   - Text readability
   - Layout at different orientations
   - Slow network performance (use browser's network throttling)

### Desktop Testing

Test at various screen sizes:
- Laptop (1366x768, 1920x1080)
- Desktop (1920x1080, 2560x1440)
- Large monitors (4K)

## Troubleshooting

### Config.json Not Loading

- Make sure `config.json` is in the root directory
- Check browser console for errors (F12)
- If using `file://` protocol, some browsers block local file fetching - use a local server or deploy to GitHub Pages

### Fonts Not Loading

- Check that font file paths are correct
- Verify `@font-face` declarations match actual font file names
- Check browser console for 404 errors

### Images Not Displaying

- Verify image paths are correct (relative to `index.html`)
- Check file names match exactly (case-sensitive on some servers)
- Ensure images are in `assets/images/` directory

### GitHub Pages Not Updating

- Wait a few minutes after pushing changes
- Check repository settings → Pages to ensure it's enabled
- Clear browser cache or try incognito mode

## Browser Support

This site uses modern CSS features (CSS custom properties, Flexbox, Grid) that are supported in:
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Android

## License

This is a personal wedding website. Feel free to use this as a template for your own project.

## Support

For issues or questions:
1. Check this README first
2. Review browser console for errors (F12)
3. Verify all file paths are correct
4. Test in different browsers/devices

