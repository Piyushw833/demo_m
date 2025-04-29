
import type {Metadata} from 'next';
import { Poppins } from 'next/font/google'; // Import Poppins
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

// Configure Poppins font
const poppins = Poppins({
  weight: ['400', '600', '700'], // Include desired weights
  subsets: ['latin'],
  variable: '--font-poppins', // Define CSS variable
  display: 'swap', // Improve font loading performance
});


export const metadata: Metadata = {
  title: 'Sweet Surprise', // Update title
  description: 'A special birthday surprise!', // Update description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> {/* Add suppressHydrationWarning */}
      {/* Apply Poppins font variable to body */}
      <body className={`${poppins.variable} font-sans antialiased`} suppressHydrationWarning> {/* Add suppressHydrationWarning */}
        {children}
        <Toaster /> {/* Add Toaster provider */}
      </body>
    </html>
  );
}

