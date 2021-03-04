
export function jsonHeader (options = {}) {
  return Object.assign(options, {
    Accept: 'application/json',
    'content-type': 'application/json'
  })
}

export function getMetaContent (name) {
  const header = document.querySelector(`meta[name="${name}"]`);
  return header && header.content;
}

export function getAuthencityToken () {
  return getMetaContent('csrf-token');
}

export function authenticityHeader (options = {}) {
  return Object.assign(options, {
    'X-CSRF-Token': getAuthencityToken(),
    'X-Requested-With': 'XMLHttpRequest'
  });
}

export function safeCredentials(options = {}) {
  return Object.assign(options, {
    credentials: 'include',
    mode: 'same-origin',
    headers: Object.assign((options.headers || {}), authenticityHeader(), jsonHeader())
  });
}

export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

export function safeCredentialsWithOutContentTypeAndAccept (options = {}) {
  return Object.assign(options, {
    credentials: 'include',
    mode: 'same-origin',
    headers: Object.assign((options.headers || {}), authenticityHeader())
  });
}