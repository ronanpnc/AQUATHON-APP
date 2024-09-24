import React from 'react';
export default function TimeTrackingLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
      <>{children}</>
  );
}
