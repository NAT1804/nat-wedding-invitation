# Wedding Invitation Website

A beautiful, modern, and responsive wedding invitation website built with TypeScript, GSAP animations, and SCSS.

## Features

### 1. **Landing/Intro Section**

- Full-screen hero with video background
- Couple names with elegant typography
- Wedding date prominently displayed
- Animated particles effect
- Smooth scroll CTA button

### 2. **Love Story Timeline**

- Interactive timeline with key milestones
- Scroll-triggered animations
- Beautiful image galleries for each milestone
- Responsive design for all devices

### 3. **Event Details**

- Wedding ceremony and reception information
- Interactive maps integration
- Calendar download functionality (.ics files)
- QR code for easy mobile access
- Beautiful card-based layout

### 4. **Photo Gallery**

- Filterable gallery (All/Engagement/Pre-Wedding)
- Lightbox for full-screen viewing
- Smooth hover effects
- Embedded pre-wedding video
- Grid layout with responsive columns

### 5. **RSVP Form**

- Guest confirmation system
- Dynamic guest count selection
- Form validation
- Success animations
- Ready for backend integration (Google Sheets/Email)

### 6. **Guestbook**

- Public wishes display
- Real-time message addition
- Beautiful card-based messages
- Date stamps for each entry

### 7. **Contact Information**

- Bride and groom contact details
- Social media links
- Wedding gift/bank information
- Beautiful card layout

### 8. **Special Effects**

- Background music player with toggle
- Smooth scrolling with ScrollSmoother
- Parallax effects
- Particle animations
- Text reveal animations
- AOS (Animate On Scroll) effects

### 9. **Mobile Responsive & Sharing**

- Fully responsive design
- Mobile-friendly navigation
- Social sharing buttons (Facebook, Twitter, WhatsApp)
- Optimized for all screen sizes

## Technologies Used

- **TypeScript** - Type-safe JavaScript
- **GSAP** - Professional-grade animations
- **ScrollSmoother** - Smooth scrolling experience
- **SplitType** - Text animation effects
- **AOS** - Animate on scroll library
- **SCSS** - Enhanced CSS with variables and mixins
- **Vite** - Fast build tool
- **Font Awesome** - Icon library

## Getting Started

1. **Install dependencies:**

```bash
npm install
```

2. **Run development server:**

```bash
npm run dev
```

3. **Build for production:**

```bash
npm run build
```

## Customization

### Colors

Edit the color variables in `src/styles/base/_variables.scss`:

- Primary colors (Rose/Pink theme)
- Secondary colors
- Text colors

### Content

Update the following in `index.html`:

- Couple names
- Wedding date
- Event locations and times
- Contact information
- Social media links

### Images/Videos

Replace placeholder images with your own:

- Hero background video
- Love story timeline images
- Gallery photos
- Pre-wedding video link

### Music

Add your background music file to `public/sounds/music_loop.mp3`

## Project Structure

```
nat-wedding-invitation/
├── public/
│   ├── glb/           # 3D models (optional)
│   └── sounds/        # Audio files
├── src/
│   ├── scripts/
│   │   └── main.ts    # Main TypeScript file
│   └── styles/
│       ├── base/      # Variables and mixins
│       ├── utils/     # Animations
│       └── main.scss  # Main styles
├── index.html         # Main HTML file
└── vite.config.ts     # Vite configuration
```

## Performance Optimization

- Lazy loading for images
- Optimized animations with GSAP
- Efficient scroll handling
- Minified production build
- Responsive images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Future Enhancements

- Backend integration for RSVP and Guestbook
- Multi-language support
- Guest photo upload feature
- Live countdown timer
- Virtual attendance option

## License

This project is created with love for wedding celebrations. Feel free to use and customize for your special day!

---

Made with ❤️ for Emily & Michael's Wedding
