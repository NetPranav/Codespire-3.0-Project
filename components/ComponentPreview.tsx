"use client";

import React from 'react';

interface ComponentPreviewProps {
  componentId: string;
}

export default function ComponentPreview({ componentId }: ComponentPreviewProps) {
  return (
    <div className="w-full h-full">
      <iframe
        src={`/preview/${componentId}`}
        className="w-full h-full border-0"
        title="Component Preview"
      />
    </div>
  );
}