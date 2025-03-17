// lib/rate-limit.js
export function rateLimit({ interval, uniqueTokenPerInterval = 500 }) {
    const tokens = new Map();
    
    return {
      async check(limit, token) {
        const now = Date.now();
        const tokenCount = tokens.get(token) || [0];
        
        if (tokenCount[0] === 0) {
          tokens.set(token, [1, now]);
          return;
        }
        
        if (now - tokenCount[1] > interval) {
          // Reset if interval has passed
          tokens.set(token, [1, now]);
          return;
        }
        
        // Check if over limit
        if (tokenCount[0] >= limit) {
          throw new Error('Rate limit exceeded');
        }
        
        // Increment token count
        tokens.set(token, [tokenCount[0] + 1, tokenCount[1]]);
        
        // Clean up old tokens
        if (tokens.size > uniqueTokenPerInterval) {
          const oldTokens = [...tokens.entries()]
            .filter(([_, timestamp]) => now - timestamp[1] > interval);
          for (const [token] of oldTokens) {
            tokens.delete(token);
          }
        }
      }
    };
  }