# Awesome Merge Picture

Awesome Merge Picture is a web application that allows users to upload and merge two images with an interactive split-view interface. Users can adjust the split direction and position, providing a unique way to compare and blend two images.

![屏幕截图_11-9-2024_23127_awesome-merge-picture pages dev](https://github.com/user-attachments/assets/21b53f7b-9fec-43c7-b90f-988d67009549)


## Features

- Upload two images for comparison
- Interactive split-view with adjustable direction (vertical/horizontal)
- Customizable split position using sliders
- Export merged image
- Keyboard shortcut to toggle dashboard visibility
- Responsive design with a blurred gradient background

## Technologies Used

- React
- Vite
- UnoCSS
- Framer Motion
- React Icons

## Getting Started

### Prerequisites

- Node.js (v20 or later recommended)
- pnpm

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/awesome-merge-picture.git
   cd awesome-merge-picture
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Start the development server:

   ```sh
   pnpm run dev
   ```

4. Open your browser and visit `http://localhost:5173` to see the application.

## Usage

1. Click the upload button to select two images.
2. Use the sliders to adjust the split position.
3. Toggle between vertical and horizontal split directions.
4. Press the spacebar to hide/show the dashboard.
5. Click the export button to download the merged image.

## Building for Production

To create a production build, run:

```sh
pnpm run build
```

The built files will be in the `dist` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
