import { useTranslations } from 'next-intl';
import React from 'react';

interface SchemaProps {
  tool: string; // The tool name, assuming you fetch translations based on the tool
}

const Schema = ({ tool }: SchemaProps) => {
  const t = useTranslations(`${tool}`);

  // Fetch the entire schema array (assuming it returns the list of schemas)
  const schemaArray = t.raw('schema');

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
