"use client"
import { motion } from 'framer-motion'
import React from 'react'

interface AnimationProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -20
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0
  }
}

export function PageTransition({ children, className = "" }: AnimationProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className={className}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ children, className = "" }: AnimationProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = "" }: AnimationProps) {
  return (
    <motion.div variants={itemVariants} className={className} transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  )
}

export function FadeIn({ children, delay = 0, className = "" }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

export function SlideIn({ children, direction = 'left', className = "" }: AnimationProps & { direction?: 'left' | 'right' | 'up' | 'down' }) {
  const directionVariants = {
    left: { initial: { x: -100, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    right: { initial: { x: 100, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    up: { initial: { y: 100, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    down: { initial: { y: -100, opacity: 0 }, animate: { y: 0, opacity: 1 } }
  }

  return (
    <motion.div
      initial={directionVariants[direction].initial}
      animate={directionVariants[direction].animate}
      className={className}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export function ScaleIn({ children, className = "" }: AnimationProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={className}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
