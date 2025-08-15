
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
    >
      <body>
        {children}
      </body>
    </html>
  );
}
