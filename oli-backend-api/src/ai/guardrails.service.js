/**
 * Guardrails Service
 * Implements safety and quality checks for AI inputs and outputs
 * 
 * Enterprise Architecture:
 * - Content filtering (toxicity, profanity, harmful content)
 * - PII detection and redaction
 * - Prompt injection detection
 * - Output validation
 * - Compliance checks (GDPR, HIPAA, etc.)
 */

/**
 * Check user input for safety and compliance
 */
const checkInput = async (input) => {
  const checks = {
    passed: true,
    message: null,
    flags: []
  };

  try {
    // Check for empty or invalid input
    if (!input || input.trim() === '') {
      checks.passed = false;
      checks.message = 'Please provide a valid message.';
      return checks;
    }

    // Check input length
    if (input.length > 10000) {
      checks.passed = false;
      checks.message = 'Your message is too long. Please keep it under 10,000 characters.';
      return checks;
    }

    // Check for toxic content
    const toxicityCheck = await detectToxicity(input);
    if (toxicityCheck.isToxic) {
      checks.passed = false;
      checks.message = 'Your message contains inappropriate content. Please rephrase your question.';
      checks.flags.push('toxicity');
      return checks;
    }

    // Check for PII (Personally Identifiable Information)
    const piiCheck = detectPII(input);
    if (piiCheck.hasPII) {
      checks.flags.push('pii');
      // Log for compliance but allow the message
      console.warn('PII detected in user input:', piiCheck.types);
    }

    // Check for prompt injection attempts
    const injectionCheck = detectPromptInjection(input);
    if (injectionCheck.isInjection) {
      checks.passed = false;
      checks.message = 'Your message contains potentially unsafe content. Please rephrase.';
      checks.flags.push('injection');
      return checks;
    }

    return checks;

  } catch (error) {
    console.error('Input guardrails error:', error);
    // On error, allow the message but log the issue
    checks.flags.push('error');
    return checks;
  }
};

/**
 * Check AI output for safety and quality
 */
const checkOutput = async (output) => {
  const checks = {
    passed: true,
    message: null,
    flags: []
  };

  try {
    // Check for toxic content in output
    const toxicityCheck = await detectToxicity(output);
    if (toxicityCheck.isToxic) {
      checks.passed = false;
      checks.message = 'I apologize, but I cannot provide that response. Let me rephrase.';
      checks.flags.push('toxicity');
      return checks;
    }

    // Check for PII leakage
    const piiCheck = detectPII(output);
    if (piiCheck.hasPII) {
      checks.flags.push('pii');
      console.warn('PII detected in AI output:', piiCheck.types);
      // Consider redacting or blocking the output
    }

    // Check for hallucinations or uncertain responses
    const uncertaintyCheck = detectUncertainty(output);
    if (uncertaintyCheck.isUncertain) {
      checks.flags.push('uncertain');
    }

    return checks;

  } catch (error) {
    console.error('Output guardrails error:', error);
    checks.flags.push('error');
    return checks;
  }
};

/**
 * Detect toxic or harmful content
 * TODO: Integrate with moderation API (OpenAI Moderation, Perspective API, etc.)
 */
const detectToxicity = async (text) => {
  // TODO: Integrate with content moderation API
  
  // Simple keyword-based detection (replace with API)
  const toxicKeywords = [
    // Add toxic keywords/patterns here
  ];

  const lowerText = text.toLowerCase();
  const isToxic = toxicKeywords.some(keyword => lowerText.includes(keyword));

  /* Production implementation example (OpenAI Moderation):
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  const moderation = await openai.moderations.create({
    input: text,
  });

  const results = moderation.results[0];
  const isToxic = results.flagged;
  const categories = Object.keys(results.categories).filter(
    cat => results.categories[cat]
  );

  return {
    isToxic,
    categories,
    scores: results.category_scores
  };
  */

  return {
    isToxic,
    categories: []
  };
};

/**
 * Detect Personally Identifiable Information (PII)
 */
const detectPII = (text) => {
  const piiPatterns = {
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    phone: /\b(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
    ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
    creditCard: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g
  };

  const detectedTypes = [];
  
  for (const [type, pattern] of Object.entries(piiPatterns)) {
    if (pattern.test(text)) {
      detectedTypes.push(type);
    }
  }

  return {
    hasPII: detectedTypes.length > 0,
    types: detectedTypes
  };
};

/**
 * Detect prompt injection attempts
 */
const detectPromptInjection = (text) => {
  const injectionPatterns = [
    /ignore (previous|above|all) (instructions|prompts)/i,
    /system (prompt|message|role)/i,
    /you are (now|a)/i,
    /new (instructions|prompt|role)/i,
    /disregard (previous|above)/i,
    /override (instructions|settings)/i
  ];

  const isInjection = injectionPatterns.some(pattern => pattern.test(text));

  return { isInjection };
};

/**
 * Detect uncertainty or potential hallucinations in AI output
 */
const detectUncertainty = (text) => {
  const uncertaintyIndicators = [
    'i\'m not sure',
    'i don\'t know',
    'i cannot confirm',
    'possibly',
    'might be',
    'could be',
    'i think',
    'perhaps'
  ];

  const lowerText = text.toLowerCase();
  const hasUncertainty = uncertaintyIndicators.some(indicator => 
    lowerText.includes(indicator)
  );

  return {
    isUncertain: hasUncertainty
  };
};

/**
 * Redact PII from text
 */
const redactPII = (text) => {
  let redactedText = text;

  const piiPatterns = {
    email: { pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, replacement: '[EMAIL]' },
    phone: { pattern: /\b(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}\b/g, replacement: '[PHONE]' },
    ssn: { pattern: /\b\d{3}-\d{2}-\d{4}\b/g, replacement: '[SSN]' },
    creditCard: { pattern: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, replacement: '[CARD]' }
  };

  for (const { pattern, replacement } of Object.values(piiPatterns)) {
    redactedText = redactedText.replace(pattern, replacement);
  }

  return redactedText;
};

module.exports = {
  checkInput,
  checkOutput,
  detectToxicity,
  detectPII,
  detectPromptInjection,
  redactPII
};
