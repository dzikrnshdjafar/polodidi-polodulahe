import React from 'react'
import { BMKGLogo } from '../utils/Logo'

export default function CompoSour() {
  return (
    <div className="content">
    <div className="flex justify-end items-center p-5">
      <div className="text-sm text-gray-500">
        Sumber: Badan Meteorologi, Klimatologi, dan Geofisika
      </div>
      <img
        src={BMKGLogo}
        alt="BMKG Logo"
        className="w-8 ml-2 h-auto" // Menyesuaikan ukuran gambar
      />
    </div>
    </div>
  );
}
