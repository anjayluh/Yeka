import React from 'react'

interface SectionHeaderProps {
    title: string;
  }

export default function SectionHeader({title}:SectionHeaderProps) {
  return (
    <h2 className="text-3xl text-center font-bold text-green-700">{title}</h2>
  )
}
