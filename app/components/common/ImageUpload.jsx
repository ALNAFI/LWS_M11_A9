'use client'

import React, { useRef, useState } from 'react'

const inputClassName =
  'w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue'

export default function ImageUpload({ name, value, defaultValue, onChange, accept = 'image/jpeg,image/png,image/gif,image/webp', label, hint, placeholder = 'Choose image or paste URL' }) {
  const inputRef = useRef(null)
  const [url, setUrl] = useState(value ?? defaultValue ?? '')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const currentUrl = value !== undefined ? value : url
  const setCurrentUrl = (v) => {
    if (value === undefined) setUrl(v)
    onChange?.(v)
  }

  async function handleFileSelect(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError('')
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload/image', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) {
        setUploadError(data.error || 'Upload failed.')
        return
      }
      if (data.url) setCurrentUrl(data.url)
    } catch {
      setUploadError('Upload failed.')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-bold mb-1">
          {label}
        </label>
      )}
      <div className="flex flex-col gap-2">
        <input type="hidden" name={name} value={currentUrl} readOnly />
        <div className="flex gap-2 flex-wrap items-center">
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            disabled={uploading}
            onChange={handleFileSelect}
            className="max-w-xs text-sm file:mr-2 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-amazon-yellow file:border-amazon-secondary disabled:opacity-70"
          />
          <span className="text-gray-500 text-sm">or enter URL below</span>
        </div>
        <input
          type="url"
          placeholder={placeholder}
          className={inputClassName}
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value.trim() || '')}
        />
      </div>
      {uploading && <p className="text-xs text-amber-600 mt-1">Uploading…</p>}
      {uploadError && <p className="text-xs text-red-600 mt-1">{uploadError}</p>}
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
      {currentUrl && (
        <div className="mt-2 h-24 w-24 rounded border border-gray-300 overflow-hidden bg-gray-100">
          <img src={currentUrl} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  )
}
