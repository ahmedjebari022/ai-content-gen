import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    topic: '',
    contentType: 'email',
    tone: 'professional',
    length: 'small'
  })
  
  const [data, setData] = useState({
    content: '',
    charCount: 0,
    wordCount: 0,
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  // use Vite env var VITE_API_URL (set in Vercel) or fallback to localhost
  const url = import.meta.env.VITE_API_URL || 'https://ai-content-gen-d68a.onrender.com/api/generate'
  
  async function GenerateResponse(body) {
    try {
      setIsLoading(true)
      setError('')
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      
      const result = await response.json()
      return result
      
    } catch (error) {
      setError('Failed to generate content: ' + error.message)
      console.log(error.message)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  function handleFormChange(e) {
    const {name, value} = e.target
    setFormData(prev => ({...prev, [name]: value}))
  }
  
  async function handleFormSubmit(e) {
    e.preventDefault()
    
    if (!formData.topic.trim()) {
      setError('Please enter a topic!')
      return
    }
    
    const response = await GenerateResponse(formData)
    
    if (response && response.success) {
      setData({
        content: response.response,
        wordCount: response.wordCount,
        charCount: response.charCount
      })
    } else {
      setError(response?.error || 'Failed to generate content')
    }
  }
  
  function handleCopy() {
    navigator.clipboard.writeText(data.content)
    alert('Copied to clipboard!')
  }
  
  function handleDownload() {
    const blob = new Blob([data.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${formData.topic.replace(/\s+/g, '-')}.txt`
    a.click()
  }
  
  function handleRegenerate() {
    handleFormSubmit({ preventDefault: () => {} })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">✨ AI Content Generator</h1>
          <p className="text-base-content/60">Create amazing content in seconds</p>
        </div>

        <div className="card bg-base-100 shadow-lg border-2 border-primary/20">
          <div className="card-body">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input 
                name='topic' 
                onChange={handleFormChange} 
                value={formData.topic} 
                type="text"
                placeholder="Enter your topic..."
                className="input input-bordered input-primary w-full"
                required
              />
              
              <div className="grid grid-cols-2 gap-3">
                <select name='contentType' value={formData.contentType} onChange={handleFormChange} className="select select-bordered select-primary">
                  <option value="blog">Blog Post</option>
                  <option value="social">Social Media</option>
                  <option value="email">Email</option>
                  <option value="ad">Advertisement</option>
                </select>
                
                <select name='tone' value={formData.tone} onChange={handleFormChange} className="select select-bordered select-primary">
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                </select>
              </div>

              <select name='length' value={formData.length} onChange={handleFormChange} className="select select-bordered select-primary w-full">
                <option value="small">Small (50-100 words)</option>
                <option value="medium">Medium (100-200 words)</option>
                <option value="large">Large (200-300 words)</option>
              </select>
              
              <button type='submit' disabled={isLoading || !formData.topic} className="btn btn-primary w-full gap-2">
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Generating...
                  </>
                ) : (
                  <>🚀 Generate Content</>
                )}
              </button>
            </form>
          </div>
        </div>

        {error && (
          <div className="alert alert-error mt-4 border-2">
            <svg className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {data.content && !isLoading && (
          <div className="card bg-base-100 shadow-lg border-2 border-success/20 mt-6">
            <div className="card-body">
              <h2 className="card-title text-success mb-4">✓ Generated Content</h2>
              
              <div className="bg-base-200 p-4 rounded-lg border border-base-300 min-h-32 max-h-64 overflow-y-auto mb-4 font-mono text-sm">
                {data.content}
              </div>
              
              <div className="stats stats-vertical md:stats-horizontal w-full mb-4 border border-base-300">
                <div className="stat">
                  <div className="stat-title">Words</div>
                  <div className="stat-value text-primary">{data.wordCount}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Characters</div>
                  <div className="stat-value text-primary">{data.charCount}</div>
                </div>
              </div>

              <div className="card-actions gap-2">
                <button onClick={handleCopy} className="btn btn-outline btn-primary flex-1">📋 Copy</button>
                <button onClick={handleDownload} className="btn btn-outline btn-primary flex-1">💾 Download</button>
                <button onClick={handleRegenerate} className="btn btn-outline btn-primary flex-1">🔄 Regenerate</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App