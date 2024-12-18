import { useTranslations } from 'next-intl';
import React from 'react';

interface SchemaProps {
  tool: string; // The tool name for fetching translations
}

const Schema = ({ tool }: SchemaProps) => {
  const t = useTranslations(tool);

  // Fetch the schema array (fallback to an empty array if undefined)
  const schemaArray = t.raw('schema') || [];

  // If no schemas are provided
  if (!Array.isArray(schemaArray) || schemaArray.length === 0) {
    return null;
  }

  return (
    <section>
      {schemaArray.map((schemaObj: object, index: number) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaObj),
          }}
        />
      ))}
    </section>
  );
};

export default Schema;
