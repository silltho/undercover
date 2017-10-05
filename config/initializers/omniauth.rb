Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '508548516182157', '5f13930a738b4b41de8594fded57c0f9', scope: "email"
  provider :google_oauth2, '276461261541-0pmdaar8d1qufjrp0p8con11begff1sq.apps.googleusercontent.com', 'On3D4W6Qe_HZqLT0yGFQC6LG', scope: "email"
end