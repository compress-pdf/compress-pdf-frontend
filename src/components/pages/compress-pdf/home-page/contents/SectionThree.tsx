import { useTranslations } from 'next-intl';
import React from 'react';

const SectionThree = () => {
  const t = useTranslations('general');

  return (
    <section>
      <h2 className="text-3xl md:text-[2.5rem] mb-6 leading-[3.4rem] font-bold  text-[#163B45] dark:text-[#fafafa]">
        {t('content.sectionThree.title')}
      </h2>
      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1 justify-start">
              <div className="inline-block  rounded-full bg-red-100 px-3 py-1 text-sm text-red-700 mb-4">
                Step 1
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Upload Your Files Directly to the Web
              </h2>
              <p className="text-gray-600 mb-6">
                Our tool allows you to upload files using 6 methods: local
                storage, drag & drop, Google Drive, OneDrive, Dropbox, and URL.
                Once uploaded, you all be redirected to the customization page.
              </p>
            </div>
            <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-800 p-2 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Paste your URL</span>
                  <span className="text-sm text-blue-500">Jack Alex</span>
                </div>
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="https://www.figma.com/design"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {/* <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" /> */}
                  <p className="text-sm text-gray-500 mb-2">
                    Upload your document
                  </p>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    Choose File
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionThree;
