"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowUpRight, Mail, MapPin, Send } from "lucide-react"
import { ExternalLink } from "@/components/ui/external-link"

type SiteSettings = any

export function Contact({ site }: { site: SiteSettings | null }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const contact = site?.contact
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const toast = (await import("sonner")).toast
    toast.success("Message sent! I'll get back to you soon.")
    setFormState({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-28 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-mono uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="fluid-heading font-bold mt-4 text-balance">
            Let&apos;s Work Together
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Have a project in mind or just want to chat? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Let&apos;s Build Something Great</h3>
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
              </p>
            </div>

            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 5 }}
              >
                <ExternalLink
                  href={contact?.email ? `mailto:${contact.email}` : "#"}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium group-hover:text-primary transition-colors">
                      {contact?.email ?? ""}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </ExternalLink>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Petaling Jaya, Malaysia</p>
                </div>
              </motion.div>
            </div>

            {/* Quick links */}
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">Or find me on</p>
              <div className="flex gap-3">
                {(contact?.socialLinks ?? []).map((item: any, idx: number) => (
                  <motion.div
                    key={item?.label ?? idx}
                    whileHover={{ y: -3 }}
                  >
                    <ExternalLink
                      href={item?.url}
                      className="px-4 py-2 rounded-full bg-secondary/50 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      {item?.label}
                    </ExternalLink>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  id="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none text-foreground placeholder:text-muted-foreground"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors"
              >
                Send Message
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
