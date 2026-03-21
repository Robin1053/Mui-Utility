export function getPasswordStrength(password: string): number {
  if (!password) return 0;

  let score = 0;

  // 1. Length Evaluation (Max 40 points)
  const len = password.length;
  if (len > 12) score += 40;
  else if (len > 8) score += 25;
  else if (len > 6) score += 10;
  else score += 5;

  // 2. Character Diversity (Max 60 points)
  // Check for different character types using Regex
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  // Award 15 points for each category met
  if (hasUpper) score += 15;
  if (hasLower) score += 15;
  if (hasNumber) score += 15;
  if (hasSpecial) score += 15;

  // 3. Penalty for low variety
  // If the password is long but only uses one type of character, reduce score
  const variationCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(
    Boolean,
  ).length;
  if (variationCount <= 1 && len > 5) {
    score -= 20;
  }

  // Ensure the final result is strictly between 0 and 100
  return Math.max(0, Math.min(100, score));
}
