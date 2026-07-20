// mappers/ index - small stub for mapping AI outputs to internal models
export function mapDetectedFoodToFoodItem(detected: any) {
  // placeholder mapping
  return {
    name: detected.label ?? 'unknown',
    confidence: detected.confidence ?? 0,
    nutrition: detected.nutrition ?? {},
  };
}
