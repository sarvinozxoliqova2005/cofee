import React from 'react'

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className='container mx-auto max-w-[1280px] w-full py-5 '>
        {children}
    </div>
  )
}
export default Container