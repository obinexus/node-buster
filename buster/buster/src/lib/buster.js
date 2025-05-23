; (function (global, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        if (global.buster) {
            console.warn('buster is already defined in the global scope');
        }
        if (!global.buster) {
            global.buster = factory();
            Object.defineProperty(buster, '__esModule', { value: true });
        }
    }
}(typeof window !== 'undefined' ? window : this, function () {
    'use strict';
    
    // Schema function for creating schema
    function schema(url) {
        let moduleName = url.split('/').pop(); // Extract module name from URL
        let version = ''; // Initialize version to empty string

        // Check if version is available
        if (moduleName.includes('.')) {
            const parts = moduleName.split('.');
            moduleName = parts[0]; // Extract module name
            version = parts[1]; // Extract version
        }

        // Return the schema consisting of module name, version, and extension
        return { moduleName, version };
    }


    // Object to store loaded modules
    const loadedModules = {};

    const buster = {
        version: "1.0.0",
        $noConflict: function () {
            if (window.buster === buster) {
                window.buster = undefined;
            }
            return buster;
        },
        load(module, options = {}, thisArg) {
            return new Promise((resolve, reject) => {
                try {
                    // Extract module name and version from the provided string
                    const { moduleName, version, extension } = schema(module);
                    
                    // Check if module is already loaded
                    if (loadedModules[moduleName]) {
                        console.warn(`Module ${moduleName} is already loaded.`);
                        if (thisArg) {
                            resolve.call(thisArg);
                        } else {
                            resolve();
                        }
                        return;
                    }

                    const cacheBuster = Date.now();
                    module = `${module}?cacheBuster=${cacheBuster}`;
                    const url = new URL(module, window.location.origin); // Construct URL correctly

                    const element = document.createElement('script');
                    element.defer = true;
                    element.type = 'application/javascript';
                    if (options.async !== false) element.async = true;


                    element.onload = () => {
                        loadedModules[moduleName] = true; // Mark module as loaded
                        if (thisArg) {
                            resolve.call(thisArg);
                        } else {
                            resolve();
                        }
                    };

                    element.onerror = (error) => {
                        console.error('Error loading busted module:', error);
                        if (options.onError) {
                            if (thisArg) {
                                options.onError.call(thisArg, error);
                            } else {
                                options.onError(error);
                            }
                        }
                        if (thisArg) {
                            reject.call(thisArg, error);
                        } else {
                            reject(error);
                        }
                    };
                    element.src = url.href;
                    document.head.appendChild(element);

                } catch (error) {
                    console.error('Error loading busted module:', error);
                    if (options.onError) {
                        if (thisArg) {
                            options.onError.call(thisArg, error);
                        } else {
                            options.onError(error);
                        }
                    }
                    if (thisArg) {
                        reject.call(thisArg, error);
                    } else {
                        reject(error);
                    }
                }
            });
        },
        bust(module, options = {}, thisArg) {
            return this.load(module, options, thisArg);
        }
    };

    // Define bust method with optional 
    // thisArg binding
    buster.bust = function (module, options, thisArg) {
        return buster.load(module, options, thisArg);
    };

    return buster;
}));
