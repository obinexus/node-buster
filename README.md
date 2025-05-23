

## 🧠 Buster – Cache Busting as a Technique
**GitHub:**

* Node.js: [obinexus/node-buster](https://github.com/obinexus/node-buster)

---

### 💡 What is Buster?

`Buster` is a polyglot-ready, framework-neutral cache busting **technique**. It dynamically loads and invalidates modules/scripts by appending a timestamp-based query param (`?cacheBuster=TIMESTAMP`) to script URLs. The goal? Force browsers and environments to **re-fetch updated content**, bypassing stale caches.

---

### 🆚 Why “Technique,” Not “Method”?

* A **method** is a fixed function — like `.clear()` or `.delete()`.
* A **technique** is a *strategic system* applied to different platforms, edge cases, and contexts.

`Buster` isn't just calling `cache.clear()` — it's orchestrating:

* Timestamp-based versioning
* Module uniqueness enforcement
* Runtime URL reconstruction
* Polyfill-friendly script injection
* Safe fallback if script fails

That’s design-level stuff. You’re not just using an API. You’re redefining behavior.

---

### ⚙️ How It Works

```js
buster.bust('/modules/bustMe.js');
```

✅ Adds `?cacheBuster=1234567890`
✅ Injects `<script>` with auto cleanup
✅ Resolves once script is loaded
✅ Rejects on fail — with optional hooks

---

### 📁 Project Structure

```
buster/
├── buster.js        # Core UMD logic (browser + Node.js bundling)
├── bustMe.js        # Demo script (used for testing)
├── index.js         # Node-friendly export
```

---

### 🚀 Proof-of-Concept (PoC)

Let’s say your users see outdated JS during a premium release. Using Buster:

1. A new version of `bustMe.js` is deployed.
2. Old clients still hold the cached script.
3. `buster.bust("/bustMe.js")` injects it with:

   ```
   /bustMe.js?cacheBuster=1700000000000
   ```
4. Browser sees it as a *brand new URL*, forcing a reload.

🧪 **Result:** You get a fresh script, guaranteed — no manual cache clearing needed.

---

### 🔄 Use Cases

* Dynamic module loading
* Hot reloads in production
* Premium product drops
* Feature toggles without full refresh
* Experimentation toggles (A/B testing)

---

### 📦 Node + Browser Compatibility

UMD-compatible for both Node + browser use. `buster.js` can be imported via `require`, `import`, or `<script>`:

```js
// CommonJS
const buster = require('./buster');
```

```html
<!-- Vanilla HTML -->
<script src="buster.js"></script>
<script>
  buster.bust('/bustMe.js');
</script>
```

---

### 🛡️ Future Directions

* TTL-based cache control
* MRU/LRU policy integration
* PolyCall bindings (for multi-runtime)
* Browser-Node hybrid runtime

---

### 🧠 Final Word

Caching bugs ain't cute. They’re subtle, chaotic, and hard to debug. `Buster` offers a **flexible, non-invasive technique** to surgically bust caches without breaking your flow or framework.

> Because sometimes, the fix isn't clearing your cache.
> It's controlling *when* your cache gets cleared.

---

