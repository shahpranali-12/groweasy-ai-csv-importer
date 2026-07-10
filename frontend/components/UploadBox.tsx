"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2, CheckCircle } from "lucide-react";
import Papa from "papaparse";

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<Record<string, string>[]>([]);
  const [importedData, setImportedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    totalRecords: 0,
    imported: 0,
    skipped: 0,
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,

    onDrop: (acceptedFiles) => {
      if (!acceptedFiles.length) return;

      const selectedFile = acceptedFiles[0];

      setFile(selectedFile);

      Papa.parse(selectedFile, {
        header: true,
        skipEmptyLines: true,

        complete: (results) => {
          setCsvData(results.data as Record<string, string>[]);
        },

        error: console.error,
      });
    },
  });

  const handleImport = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/import", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message);
      }

      setImportedData(data.records || []);

      setStats({
        totalRecords: data.totalRecords,
        imported: data.imported,
        skipped: data.skipped,
      });

      
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl">

      {/* Upload */}

      <div
  {...getRootProps()}
  className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center shadow-xl transition-all duration-300
  ${
    isDragActive
      ? "border-blue-600 bg-blue-100 dark:bg-slate-700 scale-[1.01]"
      : "border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-blue-500"
  }`}
>
  <input {...getInputProps()} />

  <Upload
    className={`mx-auto mb-5 transition-all ${
      isDragActive ? "text-blue-700 scale-125" : "text-blue-600"
    }`}
    size={60}
  />

  <h2 className="text-4xl font-bold text-black dark:text-white">
    Upload CSV File
  </h2>

  <p className="mt-3 text-lg text-gray-500 dark:text-gray-300">
    Drag & Drop your CSV here
  </p>

  <p className="mt-2 text-gray-400 dark:text-gray-400">
    or click to browse
  </p>

  <button
    type="button"
    className="mt-7 rounded-lg bg-blue-600 px-8 py-3 text-white transition hover:bg-blue-700"
  >
    Browse File
  </button>
</div>

      {/* Selected File */}

{file && (
  <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-6 shadow-lg">

    <div className="flex items-center justify-between">

      <div>

        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-600" />

          <h3 className="text-lg font-bold">
            Selected File
          </h3>
        </div>

        <p className="mt-2 font-medium">
          {file.name}
        </p>

        <p className="text-gray-500">
          {(file.size / 1024).toFixed(2)} KB
        </p>

      </div>

      <div className="text-5xl">
        📄
      </div>

    </div>

    <div className="mt-6">

      {loading ? (

        <div>

          <button
            disabled
            className="w-full rounded-lg bg-gray-500 px-6 py-3 text-white"
          >
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" size={18} />
              AI Processing...
            </span>
          </button>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">

            <div className="h-full w-full animate-pulse bg-green-500" />

          </div>

        </div>

      ) : (

        <button
          onClick={handleImport}
          className="w-full rounded-lg bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
        >
          Confirm Import
        </button>

      )}

    </div>

  </div>
)}

      {/* CSV Preview */}

      {csvData.length > 0 && (
        <div className="mt-10 rounded-xl bg-white p-6 shadow">

          <h2 className="mb-5 text-2xl font-bold">
            CSV Preview
          </h2>

          <div className="max-h-[400px] overflow-auto">

            <table className="min-w-full border">

              <thead className="sticky top-0 bg-gray-100">

                <tr>

                  {Object.keys(csvData[0]).map((header) => (

                    <th
                      key={header}
                      className="border px-4 py-2 text-left"
                    >
                      {header}
                    </th>

                  ))}

                </tr>

              </thead>

              <tbody>

                {csvData.slice(0, 5).map((row, index) => (

                  <tr key={index}>

                    {Object.values(row).map((value, i) => (

                      <td
                        key={i}
                        className="border px-4 py-2"
                      >
                        {value}
                      </td>

                    ))}

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

      {/* Summary */}

      {importedData.length > 0 && (

  <>

    <div className="mt-8 rounded-xl border border-green-300 bg-green-50 p-5 shadow-lg">

      <div className="flex items-center gap-3">

        <CheckCircle className="text-green-600" size={30} />

        <div>

          <h2 className="text-xl font-bold text-green-700">
            Import Successful
          </h2>

          <p className="text-gray-600">
            AI successfully extracted CRM records from your CSV.
          </p>

        </div>

      </div>

    </div>

    <div className="mt-8 grid gap-5 md:grid-cols-3">

      <div className="rounded-xl bg-blue-100 p-6 text-center shadow">

        <h3 className="font-bold">
          Total Records
        </h3>

        <p className="mt-2 text-4xl font-bold text-blue-700">
          {stats.totalRecords}
        </p>

      </div>

      <div className="rounded-xl bg-green-100 p-6 text-center shadow">

        <h3 className="font-bold">
          Imported
        </h3>

        <p className="mt-2 text-4xl font-bold text-green-700">
          {stats.imported}
        </p>

      </div>

      <div className="rounded-xl bg-red-100 p-6 text-center shadow">

        <h3 className="font-bold">
          Skipped
        </h3>

        <p className="mt-2 text-4xl font-bold text-red-700">
          {stats.skipped}
        </p>

      </div>

    </div>

  </>

)}
      {/* Parsed Records */}

{importedData.length > 0 && (

  <div className="mt-10 rounded-2xl bg-white p-6 shadow-lg border">

    <div className="mb-6 flex items-center justify-between">

      <div>
        <h2 className="text-2xl font-bold text-green-700">
          AI Parsed CRM Records
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Successfully extracted CRM data from your uploaded CSV.
        </p>
      </div>

      <div className="rounded-lg bg-green-100 px-4 py-2 text-green-700 font-semibold">
        {importedData.length} Records
      </div>

    </div>

    <div className="max-h-[500px] overflow-auto rounded-lg border">

      <table className="min-w-full text-sm">

        <thead className="sticky top-0 bg-green-100">

          <tr>

            {Object.keys(importedData[0]).map((header) => (

              <th
                key={header}
                className="border px-4 py-3 text-left font-semibold whitespace-nowrap"
              >
                {header.replaceAll("_", " ").toUpperCase()}
              </th>

            ))}

          </tr>

        </thead>

        <tbody>

          {importedData.map((row, index) => (

            <tr
              key={index}
              className="hover:bg-gray-50"
            >

              {Object.entries(row).map(([key, value]: any, i) => (

                <td
                  key={i}
                  className="border px-4 py-3 whitespace-nowrap"
                >

                  {key === "crm_status" ? (

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold

                      ${
                        value === "GOOD_LEAD_FOLLOW_UP"
                          ? "bg-green-100 text-green-700"

                          : value === "BAD_LEAD"
                          ? "bg-red-100 text-red-700"

                          : value === "SALE_DONE"
                          ? "bg-blue-100 text-blue-700"

                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {String(value)}
                    </span>

                  ) : (

                    String(value || "-")

                  )}

                </td>

              ))}

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

)}
    </div>
  );
}