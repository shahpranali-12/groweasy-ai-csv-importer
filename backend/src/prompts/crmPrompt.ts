export function buildPrompt(records: any[]) {
  return `
You are an AI CRM Data Extraction Assistant.

Your task is to intelligently map CSV records into the following CRM JSON format.

Return ONLY a valid JSON array.

CRM Fields:
- created_at
- name
- email
- country_code
- mobile_without_country_code
- company
- city
- state
- country
- lead_owner
- crm_status
- crm_note
- data_source
- possession_time
- description

Rules:

1. Skip records having neither email nor mobile.
2. crm_status must be one of:
GOOD_LEAD_FOLLOW_UP
DID_NOT_CONNECT
BAD_LEAD
SALE_DONE

3. data_source must be one of:
leads_on_demand
meridian_tower
eden_park
varah_swamy
sarjapur_plots

If unsure, leave blank.

Return ONLY JSON.

CSV Records:

${JSON.stringify(records)}
`;
}