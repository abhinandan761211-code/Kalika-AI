function i(t,s="/dashboard"){return!t||!t.startsWith("/")||t.startsWith("//")||t.startsWith("/\\")||/[\\]/.test(t)||/^\/[a-z]+:/i.test(t)?s:t}export{i as s};
