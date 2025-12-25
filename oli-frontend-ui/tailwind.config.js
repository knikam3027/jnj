/**
 * Tailwind CSS Configuration
 * Enterprise-grade configuration with custom theme and utilities
 * 
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      // Custom color palette
      colors: {
        primary: {
          50: '#FEF2F0',
          100: '#FDE5E1',
          200: '#FCCBC3',
          300: '#FAB1A5',
          400: '#F99787',
          500: '#D64933', // Main brand color
          600: '#C03B28',
          700: '#A9321E',
          800: '#932A14',
          900: '#7C210A',
          DEFAULT: '#D64933',
        },
        secondary: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
          DEFAULT: '#F5F5F5',
        },
        success: {
          DEFAULT: '#10B981',
          light: '#6EE7B7',
          dark: '#047857',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FCD34D',
          dark: '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#FCA5A5',
          dark: '#DC2626',
        },
        info: {
          DEFAULT: '#3B82F6',
          light: '#93C5FD',
          dark: '#1D4ED8',
        },
      },
      // Custom spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      // Custom border radius
      borderRadius: {
        '4xl': '2rem',
      },
      // Custom box shadows
      boxShadow: {
        'soft': '0 2px 15px 0 rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
        'strong': '0 10px 40px 0 rgba(0, 0, 0, 0.15)',
      },
      // Custom transitions
      transitionDuration: {
        '400': '400ms',
      },
      // Custom z-index
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      // Custom typography
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
    },
  },
  plugins: [
    // Optional: Add Tailwind plugins here
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
  ],
}

