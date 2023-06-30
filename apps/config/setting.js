const site_base_url = 'http://localhost:3000';
const site_favicon_url = '/favicon.ico';
const site_title = 'Notes App';
const site_description = 'Create and save your diary offline or online.';
const site_index = 'index'; // index or noindex

export function siteBaseUrl(base_url = site_base_url) {
  return process.env.NEXT_PUBLIC_BASE_URL || base_url;
}

export function siteFaviconUrl(favicon_url = site_favicon_url) {
  return process.env.NEXT_PUBLIC_FAVICON_URL || favicon_url;
}

export function siteTitle(title = site_title) {
  return process.env.NEXT_PUBLIC_TITLE || title;
}

export function siteDescription(description = site_description) {
  return process.env.NEXT_PUBLIC_DESCRIPTION || description;
}

export function siteIndex(index = site_index) {
  if (process.env.NEXT_PUBLIC_INDEX) {
    index =
      process.env.NEXT_PUBLIC_INDEX == 'index'
        ? 'index, follow'
        : 'noindex, nofollow';
  } else {
    index = index == 'index' ? 'index, follow' : 'noindex, nofollow';
  }
  return index;
}

export function toastOptions(type = 'info') {
  const options = {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    closeButton: false,
    type: type,
  };

  return options;
}
