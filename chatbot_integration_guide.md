# Career Guidance Chatbot Integration Guide

## Quick Integration Steps:

### 1. Add the JavaScript file to your website
```html
<!-- Add this before closing </body> tag in your HTML -->
<script src="career_chatbot.js"></script>
```

### 2. Update your existing chat button
The chatbot will automatically detect common chat button selectors:
- `#chat-assistant`
- `.chat-assistant` 
- `[data-chat]`
- `.chatbot-btn`
- `#chatbot-button`

### 3. If your button uses a different selector:
Add this ID or class to your existing button:
```html
<button id="chat-assistant">Your Button Text</button>
```

### 4. Or modify the JavaScript:
Update line 120 in career_chatbot.js to match your button selector:
```javascript
chatButton = document.querySelector('your-button-selector');
```

## Features:
- ✅ Maintains conversation context
- ✅ Professional career counselor responses
- ✅ Student-focused guidance
- ✅ Responsive modal design
- ✅ Quick suggestion buttons
- ✅ Seamless UI integration

## No Backend Required:
- Uses static responses stored in JavaScript
- No API calls needed
- Works entirely on frontend
- Fast response times

## Customization:
- Modify responses in the `initializeResponses()` method
- Update styling in the `addChatbotStyles()` method
- Add more keywords and responses as needed
