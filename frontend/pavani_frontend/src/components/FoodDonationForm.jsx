"use client"

import { useState } from "react"
import "./FoodDonationForm.css"

// Add this constant at the top of the component, after the imports
const MOCK_MODE = true // Set to false when using real backend

const FoodDonationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    foodType: "",
    quantity: "",
    additionalInfo: "",
  })

  const [showOtpModal, setShowOtpModal] = useState(false)
  const [otp, setOtp] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [isServerConnected, setIsServerConnected] = useState(null)

  // Replace the testServerConnection function with:
  const testServerConnection = async () => {
    if (MOCK_MODE) {
      setIsServerConnected(true)
      setMessage("✅ Running in MOCK MODE - Backend simulation active!")
      return
    }

    try {
      const response = await fetch("http://localhost:8080/api/donations/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        setIsServerConnected(true)
        setMessage("✅ Server connection successful!")
      } else {
        setIsServerConnected(false)
        setMessage("❌ Server responded but with an error. Check server logs.")
      }
    } catch (error) {
      setIsServerConnected(false)
      setMessage("❌ Cannot connect to server. Please ensure the Spring Boot server is running on port 8080.")
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Replace the handleSubmit function with:
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    // Mock mode simulation
    if (MOCK_MODE) {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate mock OTP
      const mockOtp = Math.floor(100000 + Math.random() * 900000).toString()
      console.log("=================================")
      console.log("MOCK OTP GENERATED FOR:", formData.phoneNumber)
      console.log("MOCK OTP CODE:", mockOtp)
      console.log("=================================")

      setShowOtpModal(true)
      setMessage("✅ OTP sent! Check your browser console for the MOCK OTP code.")
      setIsSubmitting(false)
      return
    }

    // Real backend code
    try {
      const response = await fetch("http://localhost:8080/api/donations/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowOtpModal(true)
        setMessage("✅ OTP sent! Check your console/terminal for the OTP code.")
      } else {
        const errorData = await response.json().catch(() => ({}))
        setMessage(`❌ Server Error: ${errorData.message || "Please try again."}`)
      }
    } catch (error) {
      console.error("Network error:", error)
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        setMessage(
          "❌ Cannot connect to server. Please ensure the Spring Boot backend is running on http://localhost:8080. Or set MOCK_MODE = true for testing.",
        )
      } else {
        setMessage("❌ Network error occurred. Please check your connection and try again.")
      }
    }

    setIsSubmitting(false)
  }

  // Replace the handleOtpSubmit function with:
  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Mock mode simulation
    if (MOCK_MODE) {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, accept any 6-digit OTP
      if (otp.length === 6 && /^\d+$/.test(otp)) {
        console.log("=================================")
        console.log("MOCK DONATION SAVED SUCCESSFULLY!")
        console.log("Donor:", formData.fullName)
        console.log("Phone:", formData.phoneNumber)
        console.log("Food Type:", formData.foodType)
        console.log("Quantity:", formData.quantity)
        console.log("Address:", formData.address)
        if (formData.additionalInfo) {
          console.log("Additional Info:", formData.additionalInfo)
        }
        console.log("=================================")

        setMessage("✅ Donation submitted successfully! Thank you for your kindness. (MOCK MODE)")
        setShowOtpModal(false)
        setFormData({
          fullName: "",
          phoneNumber: "",
          address: "",
          foodType: "",
          quantity: "",
          additionalInfo: "",
        })
        setOtp("")
      } else {
        setMessage("❌ Please enter a valid 6-digit OTP")
      }
      setIsSubmitting(false)
      return
    }

    // Real backend code
    try {
      const response = await fetch("http://localhost:8080/api/donations/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: formData.phoneNumber,
          otp: otp,
        }),
      })

      if (response.ok) {
        setMessage("✅ Donation submitted successfully! Thank you for your kindness.")
        setShowOtpModal(false)
        setFormData({
          fullName: "",
          phoneNumber: "",
          address: "",
          foodType: "",
          quantity: "",
          additionalInfo: "",
        })
        setOtp("")
      } else {
        const errorData = await response.json().catch(() => ({}))
        setMessage(`❌ ${errorData.message || "Invalid OTP. Please try again."}`)
      }
    } catch (error) {
      console.error("Network error:", error)
      setMessage("❌ Network error occurred. Please check your connection and try again.")
    }

    setIsSubmitting(false)
  }

  return (
    <div className="donation-container">
      <div className="left-section">
        <div className="quote-section">
          <h2 className="quote">"The best way to find yourself is to lose yourself in the service of others."</h2>
        </div>

        <div className="image-section">
          <img src="/placeholder.svg?height=300&width=400" alt="Child with food" className="donation-image" />
        </div>

        <div className="quote-section">
          <h2 className="quote">"A small act of kindness can make a world of difference."</h2>
        </div>
      </div>

      <div className="right-section">
        <div className="form-container">
          <h1 className="form-title">Food Donation Form</h1>

          {/* Add this info section right after the form title */}
          <div className="mode-indicator">
            {MOCK_MODE ? (
              <div className="mock-mode-banner">
                🧪 DEMO MODE: Backend simulation active - Check browser console for OTP
              </div>
            ) : (
              <div className="live-mode-banner">🔴 LIVE MODE: Connecting to Spring Boot backend</div>
            )}
          </div>

          {message && <div className="message">{message}</div>}

          {/* Add this button before the form */}
          <div className="server-status">
            <button
              type="button"
              onClick={testServerConnection}
              className="test-connection-button"
              disabled={isSubmitting}
            >
              Test Server Connection
            </button>
            {isServerConnected !== null && (
              <div className={`connection-status ${isServerConnected ? "connected" : "disconnected"}`}>
                {isServerConnected ? "🟢 Server Connected" : "🔴 Server Disconnected"}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="donation-form">
            <div className="form-group">
              <label htmlFor="fullName">
                <span className="icon">👤</span> Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">
                <span className="icon">📞</span> Phone Number:
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">
                <span className="icon">📍</span> Address for Pickup:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address or nearby landmark"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="foodType">
                <span className="icon">🍽️</span> Type of Food to Donate:
              </label>
              <select id="foodType" name="foodType" value={formData.foodType} onChange={handleInputChange} required>
                <option value="">Select food type</option>
                <option value="cooked-meals">Cooked Meals</option>
                <option value="raw-vegetables">Raw Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="grains-cereals">Grains & Cereals</option>
                <option value="dairy-products">Dairy Products</option>
                <option value="packaged-food">Packaged Food</option>
                <option value="beverages">Beverages</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quantity">
                <span className="icon">📦</span> Quantity of Food:
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Enter the quantity"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="additionalInfo">
                <span className="icon">💬</span> Additional Information (Optional):
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                placeholder="Add any additional info or special instructions"
                rows="4"
              />
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Donation"}
            </button>
          </form>
        </div>
      </div>

      {showOtpModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Enter OTP</h3>
            <p>Please enter the OTP sent to your phone number</p>
            <form onSubmit={handleOtpSubmit}>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                required
              />
              <div className="modal-buttons">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Verifying..." : "Verify OTP"}
                </button>
                <button type="button" onClick={() => setShowOtpModal(false)} className="cancel-button">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default FoodDonationForm
