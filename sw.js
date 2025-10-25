// Service Worker - Moth Wing Power Business Planning
const CACHE_NAME = 'moth-emporium-v1.0.0';
const OFFLINE_URL = '/offline.html';

// Files to cache for offline functionality
const CACHE_FILES = [
  '/',
  '/index.html',
  '/mystical-styles.css',
  '/animations.css',
  '/particle-effects.css',
  '/mystical-animations.js',
  '/particle-system.js',
  '/interactive-features.js',
  '/data-manager.js',
  '/enhanced-calculators.js',
  '/document-integration.js',
  '/mobile-enhancements.js',
  '/error-handler.js',
  '/loading-states.js',
  '/offline-support.js',
  '/analytics-tracker.js',
  '/admin-panel.js',
  '/tools/launch_playbook_30_days.md',
  '/tools/product_catalog_seed.csv',
  '/tools/customer_service_templates.md',
  '/tools/content_calendar_2weeks.csv',
  '/tools/shipping_returns_policy.md',
  '/tools/size_guide_snippet.html',
  '/tools/supplier_vetting_checklist.md'
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(CACHE_FILES);
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();

            // Cache the response for future use
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch((error) => {
            console.log('Service Worker: Network request failed', event.request.url);
            
            // Return offline page for navigation requests
            if (event.request.destination === 'document') {
              return caches.match(OFFLINE_URL);
            }
            
            // Return cached version if available
            return caches.match(event.request);
          });
      })
  );
});

// Background sync for offline data
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'data-sync') {
    event.waitUntil(syncOfflineData());
  }
});

// Push notifications for updates
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Update',
        icon: '/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Moth Emporium Update', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling from main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_DATA') {
    cacheBusinessData(event.data.data);
  }
  
  if (event.data && event.data.type === 'GET_CACHED_DATA') {
    getCachedBusinessData().then((data) => {
      event.ports[0].postMessage({ type: 'CACHED_DATA', data });
    });
  }
});

// Cache business data for offline use
async function cacheBusinessData(data) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
    await cache.put('/business-data.json', response);
    console.log('Service Worker: Business data cached');
  } catch (error) {
    console.error('Service Worker: Failed to cache business data', error);
  }
}

// Get cached business data
async function getCachedBusinessData() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = await cache.match('/business-data.json');
    if (response) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Service Worker: Failed to get cached business data', error);
    return null;
  }
}

// Sync offline data when back online
async function syncOfflineData() {
  try {
    console.log('Service Worker: Syncing offline data...');
    
    // Get offline data from IndexedDB or localStorage
    const offlineData = await getOfflineData();
    
    if (offlineData && offlineData.length > 0) {
      // Send data to server
      const response = await fetch('/api/sync-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offlineData)
      });
      
      if (response.ok) {
        console.log('Service Worker: Offline data synced successfully');
        // Clear offline data after successful sync
        await clearOfflineData();
      }
    }
  } catch (error) {
    console.error('Service Worker: Failed to sync offline data', error);
  }
}

// Get offline data from storage
async function getOfflineData() {
  try {
    // Try to get from IndexedDB first
    const db = await openDB();
    const transaction = db.transaction(['offlineData'], 'readonly');
    const store = transaction.objectStore('offlineData');
    const data = await store.getAll();
    return data;
  } catch (error) {
    console.error('Service Worker: Failed to get offline data', error);
    return [];
  }
}

// Clear offline data after sync
async function clearOfflineData() {
  try {
    const db = await openDB();
    const transaction = db.transaction(['offlineData'], 'readwrite');
    const store = transaction.objectStore('offlineData');
    await store.clear();
    console.log('Service Worker: Offline data cleared');
  } catch (error) {
    console.error('Service Worker: Failed to clear offline data', error);
  }
}

// Open IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MothEmporiumDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('offlineData')) {
        db.createObjectStore('offlineData', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

// Update cache when new version is available
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'UPDATE_CACHE') {
    event.waitUntil(updateCache());
  }
});

async function updateCache() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const newCache = await caches.open(CACHE_NAME + '-new');
    
    // Add new files to cache
    await newCache.addAll(CACHE_FILES);
    
    // Replace old cache with new one
    await caches.delete(CACHE_NAME);
    await caches.rename(CACHE_NAME + '-new', CACHE_NAME);
    
    console.log('Service Worker: Cache updated successfully');
  } catch (error) {
    console.error('Service Worker: Failed to update cache', error);
  }
}
