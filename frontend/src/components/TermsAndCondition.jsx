// TermsAndConditions.jsx
export const TermsAndConditions = ({ accepted, onChange }) => (
  <div className="mb-8 p-4 border rounded-lg bg-gray-50">
    <h3 className="text-lg font-bold mb-4">Terms & Conditions</h3>
    
    <div className="space-y-2 mb-4">
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2">
          <input 
            type="radio" 
            name="terms" 
            value="accept"
            checked={accepted === 'accept'}
            onChange={() => onChange('accept')}
            className="h-4 w-4 text-blue-600"
            required
          />
          <span className="font-medium">I accept all terms and conditions</span>
        </label>

        <label className="flex items-center gap-2 ml-4">
          <input
            type="radio"
            name="terms"
            value="decline"
            checked={accepted === 'decline'}
            onChange={() => onChange('decline')}
            className="h-4 w-4 text-red-600"
          />
          <span className="font-medium">I decline the terms</span>
        </label>
      </div>
    </div>

    <div className="text-sm text-gray-600 space-y-2">
      <p>1. Seller must provide valid ownership documents</p>
      <p>2. Platform fee of 2% will be charged on successful sale</p>
      <p>3. All disputes will be settled through arbitration</p>
      <p>4. Listings must comply with local land laws</p>
    </div>
  </div>
)