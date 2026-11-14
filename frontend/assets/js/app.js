
/* =========================================================
   FARMCONNECT - COMPLETE FRONTEND APPLICATION
   Farmer | Customer | Admin
========================================================= */

const API = "/api";

const $ = (selector, root = document) =>
    root.querySelector(selector);

const app = $("#app");

const path =
    location.pathname.replace(/\/+$/, "") || "/";


/* =========================================================
   AUTHENTICATION AND UTILITIES
========================================================= */

const getToken = () =>
    localStorage.getItem("fc_token");

const getUser = () => {
    try {
        return JSON.parse(
            localStorage.getItem("fc_user") || "null"
        );
    } catch {
        return null;
    }
};

const setSession = data => {
    localStorage.setItem("fc_token", data.token);
    localStorage.setItem(
        "fc_user",
        JSON.stringify(data.user)
    );
};

const logout = () => {
    localStorage.removeItem("fc_token");
    localStorage.removeItem("fc_user");
    location.href = "/";
};

const money = amount =>
    "₹" + Number(amount || 0).toLocaleString("en-IN");

const esc = value =>
    String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[char]));


/* =========================================================
   API HELPER
========================================================= */

async function api(url, options = {}) {

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (getToken()) {
        headers.Authorization = "Bearer " + getToken();
    }

    const response = await fetch(API + url, {
        ...options,
        headers
    });

    const data = await response.json().catch(() => ({
        message: "Unexpected server response"
    }));

    if (!response.ok) {
        throw new Error(
            data.message || "Request failed"
        );
    }

    return data;
}


/* =========================================================
   COMMON COMPONENTS
========================================================= */

function brand() {
    return `
        <a class="brand" href="/">
            <span class="brand-mark">✳</span>
            farmconnect
        </a>
    `;
}

function notice(element, message, error = false) {
    if (!element) return;

    element.innerHTML = `
        <div class="form-message ${error ? "error" : ""}">
            ${esc(message)}
        </div>
    `;
}


/* =========================================================
   IMAGE FALLBACK
========================================================= */

document.addEventListener("error", event => {

    const img = event.target;

    if (
        img &&
        img.tagName === "IMG" &&
        !img.dataset.fallbackApplied
    ) {
        img.dataset.fallbackApplied = "true";
        img.src = "/assets/images/farm-hero.svg";
    }

}, true);


/* =========================================================
   HOMEPAGE
========================================================= */

function home() {

    app.innerHTML = `

        <header class="wrap nav">

            ${brand()}

            <nav class="nav-links">
                <a href="#how">How it works</a>
                <a href="#portals">Portals</a>
                <a href="#how">Our mission</a>
            </nav>

            <div class="nav-actions">

                <a class="btn btn-light"
                   href="/customer/login">
                    Sign in
                </a>

                <a class="btn btn-primary"
                   href="/customer/register">
                    Join marketplace ↗
                </a>

            </div>

        </header>


        <main class="wrap">

            <!-- HERO SECTION -->

            <section class="hero">

                <div class="hero-content">

                    <span class="eyebrow">
                        ✦ Grown with care · Traded with trust
                    </span>

                    <h1>
                        Good food starts
                        <span>closer to home.</span>
                    </h1>

                    <p>
                        Discover fresh farm produce directly
                        from the people who grow it.
                        Fair prices for farmers,
                        fresher choices for everyone.
                    </p>

                    <div class="hero-buttons">

                        <a class="btn btn-primary"
                           href="/customer/login">
                            Explore marketplace ↗
                        </a>

                        <a class="btn btn-light"
                           href="/farmer/register">
                            I'm a farmer
                        </a>

                    </div>

                    <p class="small">
                        A simpler, more transparent way to bring
                        farms and communities together.
                    </p>

                </div>


                <!-- HERO IMAGE -->

                <div class="hero-art">

                    <img
                        class="hero-image"
                        src="/assets/images/farm-hero.svg"
                        alt="Fresh farm produce"
                     >

                    <div class="floating-note">
                        <strong>Farm to table</strong>
                        Fresh produce. Direct connection.
                    </div>

                </div>

            </section>


            <!-- THREE PORTALS -->

            <section class="section" id="portals">

                <div class="section-head">

                    <div>

                        <span class="eyebrow">
                            Choose your space
                        </span>

                        <h2>
                            One marketplace. Three experiences.
                        </h2>

                        <p class="muted">
                            Dedicated portals designed around
                            what each person needs.
                        </p>

                    </div>

                </div>


                <div class="portal-grid">


                    <!-- FARMER PORTAL -->

                    <article class="portal-card">

                        <div class="portal-icon">🌱</div>

                        <h3>Farmer portal</h3>

                        <p>
                            List your harvest, manage inventory,
                            receive orders and grow your
                            customer base.
                        </p>

                        <a class="text-link"
                           href="/farmer/login">
                            Enter farmer portal →
                        </a>

                        <p class="small">
                            <a href="/farmer/register">
                                New farmer? Create an account
                            </a>
                        </p>

                    </article>


                    <!-- CUSTOMER PORTAL -->

                    <article class="portal-card">

                        <div class="portal-icon">🧺</div>

                        <h3>Customer portal</h3>

                        <p>
                            Explore seasonal produce,
                            connect with growers and keep
                            track of every order.
                        </p>

                        <a class="text-link"
                           href="/customer/login">
                            Enter customer portal →
                        </a>

                        <p class="small">
                            <a href="/customer/register">
                                New customer? Create an account
                            </a>
                        </p>

                    </article>


                    <!-- ADMIN PORTAL -->

                    <article class="portal-card">

                        <div class="portal-icon">✳</div>

                        <h3>Admin portal</h3>

                        <p>
                            Oversee the marketplace,
                            approve farmer accounts and
                            keep listings trustworthy.
                        </p>

                        <a class="text-link"
                           href="/admin/login">
                            Secure admin sign in →
                        </a>

                        <p class="small">
                            Administrator accounts are
                            created securely.
                        </p>

                    </article>

                </div>

            </section>


            <!-- HOW IT WORKS -->

            <section class="section" id="how">

                <div class="feature-band">

                    <div>

                        <span class="eyebrow">
                            The better way to buy local
                        </span>

                        <h2>
                            Less distance between<br>
                            the grower and your table.
                        </h2>

                        <p>
                            FarmConnect helps farmers reach
                            buyers directly, while giving
                            customers clear product, price,
                            quantity and location details.
                        </p>

                    </div>

                    <a class="btn btn-lime"
                       href="/customer/register">
                        Start exploring ↗
                    </a>

                </div>

            </section>

        </main>


        <footer class="wrap footer">

            © ${new Date().getFullYear()}
            FarmConnect · Growing connections,
            one harvest at a time.

        </footer>

    `;
}


/* =========================================================
   LOGIN AND REGISTRATION
========================================================= */

function authPage(role, mode) {

    const isRegister = mode === "register";

    const names = {
        farmer: "Farmer",
        customer: "Customer",
        admin: "Admin"
    };

    const name = names[role];

    const title = isRegister
        ? `Create your ${name.toLowerCase()} account`
        : `Welcome back, ${name.toLowerCase()}`;

    const heading = {
        farmer: "Your harvest deserves a wider market.",
        customer: "Fresh choices, straight from the source.",
        admin: "A clear view of the whole marketplace."
    }[role];

    app.innerHTML = `

        <div class="auth-shell">

            <section class="auth-visual">

                ${brand()}

                <div>

                    <span class="eyebrow">
                        FARMCONNECT · ${name.toUpperCase()} PORTAL
                    </span>

                    <h1>${heading}</h1>

                    <p>
                        ${
                            role === "farmer"
                            ? "Bring your produce online, connect with buyers and manage orders in one simple place."
                            : role === "customer"
                            ? "Discover local produce, compare listings and follow your orders from one easy dashboard."
                            : "Manage registrations, marketplace listings and platform activity from your secure control room."
                        }
                    </p>

                </div>

                <div class="small" style="color:#c5d7ca">
                    🌿 Connecting growers and communities
                </div>

            </section>


            <section class="auth-form-side">

                <div class="auth-card">

                    <a class="text-link" href="/">
                        ← Back to FarmConnect
                    </a>

                    <h2>${title}</h2>

                    <p class="muted">
                        ${
                            isRegister
                            ? "It only takes a moment to get started."
                            : "Sign in to continue to your dedicated portal."
                        }
                    </p>

                    <div id="message"></div>

                    <form id="authForm">

                        ${
                            isRegister
                            ? `
                                <div class="field">
                                    <label>Full name</label>
                                    <input
                                        name="name"
                                        required
                                        placeholder="Your full name"
                                    >
                                </div>
                            `
                            : ""
                        }


                        <div class="field">

                            <label>Email address</label>

                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="you@example.com"
                            >

                        </div>


                        ${
                            isRegister
                            ? `
                                <div class="field">
                                    <label>Phone number</label>
                                    <input
                                        name="phone"
                                        placeholder="Your contact number"
                                    >
                                </div>

                                <div class="field">
                                    <label>Address / Location</label>
                                    <input
                                        name="address"
                                        placeholder="Village, town or city"
                                    >
                                </div>
                            `
                            : ""
                        }


                        <div class="field">

                            <label>Password</label>

                            <input
                                name="password"
                                type="password"
                                minlength="8"
                                required
                                placeholder="${
                                    isRegister
                                    ? "At least 8 characters"
                                    : "Enter your password"
                                }"
                            >

                        </div>


                        ${
                            isRegister
                            ? `
                                <p class="form-note">
                                    ${
                                        role === "farmer"
                                        ? "Your farmer account will be reviewed by an administrator before you can sign in."
                                        : "By creating an account, you agree to use FarmConnect responsibly."
                                    }
                                </p>
                            `
                            : ""
                        }


                        <button
                            class="btn btn-primary full"
                            type="submit"
                        >
                            ${isRegister ? "Create account" : "Sign in"}
                            <span>→</span>
                        </button>

                    </form>


                    ${
                        role !== "admin"
                        ? `
                            <div class="auth-switch">

                                ${
                                    isRegister
                                    ? "Already have an account?"
                                    : "New to FarmConnect?"
                                }

                                <a href="/${role}/${isRegister ? "login" : "register"}">
                                    ${isRegister ? "Sign in" : "Create account"}
                                </a>

                            </div>
                        `
                        : ""
                    }


                    ${
                        role !== "admin"
                        ? `
                            <div class="auth-switch">
                                <a href="/${role === "farmer" ? "customer" : "farmer"}/login">
                                    Go to ${role === "farmer" ? "customer" : "farmer"} portal
                                </a>
                            </div>
                        `
                        : ""
                    }

                </div>

            </section>

        </div>

    `;


    $("#authForm").addEventListener("submit", async event => {

        event.preventDefault();

        const form = event.currentTarget;

        const submit = form.querySelector(
            'button[type="submit"]'
        );

        const payload = Object.fromEntries(
            new FormData(form).entries()
        );

        const msg = $("#message");

        msg.innerHTML = "";

        submit.disabled = true;
        submit.textContent = "Please wait…";

        const endpoint = isRegister
            ? `/auth/register/${role}`
            : `/auth/login/${role}`;

        try {

            const data = await api(endpoint, {
                method: "POST",
                body: JSON.stringify(payload)
            });

            if (isRegister) {

                notice(msg, data.message);
                form.reset();
                return;

            }

            setSession(data);

            location.href = data.redirect;

        } catch (error) {

            notice(msg, error.message, true);

        } finally {

            submit.disabled = false;

            submit.innerHTML = `
                ${isRegister ? "Create account" : "Sign in"}
                <span>→</span>
            `;

        }

    });

}


/* =========================================================
   DASHBOARD SHELL
========================================================= */

function dashboardShell(role, content) {

    const user = getUser();

    const labels = {
        farmer: "Farmer workspace",
        customer: "Customer space",
        admin: "Admin control room"
    };

    const navs = {

        farmer: [
            ["Overview", "/farmer/dashboard", "◫"],
            ["My products", "/farmer/dashboard?view=products", "▦"],
            ["Incoming orders", "/farmer/dashboard?view=orders", "↗"]
        ],

        customer: [
            ["Marketplace", "/customer/dashboard", "⌕"],
            ["My orders", "/customer/dashboard?view=orders", "▤"]
        ],

        admin: [
            ["Overview", "/admin/dashboard", "◫"],
            ["Farmer approvals", "/admin/dashboard?view=farmers", "♙"],
            ["Moderation", "/admin/dashboard?view=products", "▦"]
        ]

    };


    app.innerHTML = `

        <header class="topbar">

            <div class="wrap nav">

                ${brand()}

                <div class="nav-actions">

                    <span class="small">
                        ${esc(user?.name || "Account")} · ${role}
                    </span>

                    <button class="btn btn-light" id="logout">
                        Sign out ↗
                    </button>

                </div>

            </div>

        </header>


        <div class="dash-layout">

            <aside class="sidebar">

                <div class="side-label">
                    ${labels[role].toUpperCase()}
                </div>

                ${navs[role].map((item, index) => `

                    <a
                        class="side-link ${
                            index === 0 && !location.search
                            ? "active"
                            : ""
                        }"
                        href="${item[1]}"
                    >

                        <span>${item[2]}</span>
                        ${item[0]}

                    </a>

                `).join("")}

            </aside>


            <main class="dash-main" id="dashContent">
                ${content}
            </main>

        </div>

    `;

    $("#logout").onclick = logout;

}


/* =========================================================
   FARMER DASHBOARD
========================================================= */

async function farmerDashboard() {

    dashboardShell("farmer", `

        <div class="dash-head">

            <div>

                <h1>
                    Good to see you,
                    ${esc(getUser()?.name || "Farmer")} 👋
                </h1>

                <p class="muted">
                    Here's what's happening with your farm today.
                </p>

            </div>

            <button class="btn btn-primary" id="addProduct">
                ＋ Add product
            </button>

        </div>

        <div id="dashMessage"></div>

        <div id="farmerBody">
            Loading your farm workspace…
        </div>

    `);


    const view =
        new URLSearchParams(location.search).get("view")
        || "overview";

    const body = $("#farmerBody");

    try {

        const [productsData, ordersData] = await Promise.all([
            api("/products/mine"),
            api("/orders/my")
        ]);

        const products = productsData.products;
        const orders = ordersData.orders;


        if (view === "orders") {

            body.innerHTML = `
                <h2>Incoming orders</h2>
                ${orderTable(orders, true)}
            `;

        } else if (view === "products") {

            body.innerHTML = `
                <h2>My product listings</h2>
                ${productTable(products, true)}
            `;

        } else {

            body.innerHTML = `

                <div class="stats">

                    <div class="stat-card">
                        <span>Active listings</span>
                        <strong>${products.length}</strong>
                    </div>

                    <div class="stat-card">
                        <span>Incoming orders</span>
                        <strong>
                            ${orders.filter(
                                order => order.status === "Pending"
                            ).length}
                        </strong>
                    </div>

                    <div class="stat-card">
                        <span>Accepted</span>
                        <strong>
                            ${orders.filter(
                                order => order.status === "Accepted"
                            ).length}
                        </strong>
                    </div>

                    <div class="stat-card">
                        <span>Completed sales</span>
                        <strong>
                            ${money(
                                orders
                                    .filter(
                                        order => order.status === "Completed"
                                    )
                                    .reduce(
                                        (total, order) =>
                                            total + order.totalPrice,
                                        0
                                    )
                            )}
                        </strong>
                    </div>

                </div>


                <div class="panel">

                    <h2>Recent orders</h2>

                    ${orderTable(orders.slice(0, 5), true)}

                </div>


                <div class="panel" style="margin-top:18px">

                    <h2>Your products</h2>

                    ${productTable(products.slice(0, 4), true)}

                </div>

            `;

        }


        $("#addProduct").onclick = showProductForm;


        body.querySelectorAll("[data-status]").forEach(button => {

            button.onclick = async () => {

                try {

                    await api(
                        `/orders/${button.dataset.id}/status`,
                        {
                            method: "PATCH",
                            body: JSON.stringify({
                                status: button.dataset.status
                            })
                        }
                    );

                    farmerDashboard();

                } catch (error) {

                    notice(
                        $("#dashMessage"),
                        error.message,
                        true
                    );

                }

            };

        });


        body.querySelectorAll("[data-delete]").forEach(button => {

            button.onclick = async () => {

                if (!confirm("Delete this listing?")) return;

                try {

                    await api(
                        `/products/${button.dataset.delete}`,
                        { method: "DELETE" }
                    );

                    farmerDashboard();

                } catch (error) {

                    notice(
                        $("#dashMessage"),
                        error.message,
                        true
                    );

                }

            };

        });

    } catch (error) {

        body.innerHTML = `
            <div class="empty">
                ${esc(error.message)}
            </div>
        `;

    }

}


/* =========================================================
   ADD PRODUCT FORM
========================================================= */

function showProductForm() {

    const box = $("#dashMessage");

    box.innerHTML = `

        <div class="panel">

            <h3>New product listing</h3>

            <form id="productForm" class="toolbar">

                <input
                    name="cropName"
                    required
                    placeholder="Crop name"
                >

                <input
                    name="pricePerKg"
                    type="number"
                    min="0.01"
                    step="0.01"
                    required
                    placeholder="Price per kg (₹)"
                >

                <input
                    name="quantityAvailable"
                    type="number"
                    min="0.1"
                    step="0.1"
                    required
                    placeholder="Quantity (kg)"
                >

                <input
                    name="qualityGrade"
                    placeholder="Quality grade (A)"
                >

                <input
                    name="location"
                    required
                    placeholder="Available location"
                >

                <input
                    name="imageUrl"
                    placeholder="Image URL (optional)"
                >

                <textarea
                    name="description"
                    placeholder="Product description"
                ></textarea>

                <button class="btn btn-primary" type="submit">
                    Publish listing
                </button>

            </form>

        </div>

    `;


    $("#productForm").onsubmit = async event => {

        event.preventDefault();

        const form = event.currentTarget;

        const data = Object.fromEntries(
            new FormData(form)
        );

        data.pricePerKg = Number(data.pricePerKg);
        data.quantityAvailable = Number(data.quantityAvailable);

        const button = form.querySelector(
            'button[type="submit"]'
        );

        button.disabled = true;
        button.textContent = "Publishing…";

        try {

            await api("/products", {
                method: "POST",
                body: JSON.stringify(data)
            });

            farmerDashboard();

        } catch (error) {

            button.disabled = false;
            button.textContent = "Publish listing";

            notice(box, error.message, true);

        }

    };

}


/* =========================================================
   CUSTOMER DASHBOARD
========================================================= */

async function customerDashboard() {

    dashboardShell("customer", `

        <div class="dash-head">

            <div>

                <h1>Your marketplace 🧺</h1>

                <p class="muted">
                    Fresh produce, listed directly by local farmers.
                </p>

            </div>

        </div>

        <div id="customerBody">
            Loading marketplace…
        </div>

    `);


    const view =
        new URLSearchParams(location.search).get("view")
        || "market";

    const body = $("#customerBody");

    try {

        if (view === "orders") {

            const data = await api("/orders/my");

            body.innerHTML = `
                <h2>Your orders</h2>
                ${orderTable(data.orders, false)}
            `;

            return;

        }


        body.innerHTML = `

            <div class="toolbar">

                <input
                    class="search-input"
                    id="search"
                    placeholder="Search vegetables, fruits or grains…"
                >

                <input
                    class="search-input"
                    id="location"
                    placeholder="Filter by location"
                >

                <button class="btn btn-primary" id="find">
                    Search
                </button>

            </div>

            <div class="product-grid" id="products"></div>

        `;


        async function loadProducts() {

            const query = new URLSearchParams({
                search: $("#search").value,
                location: $("#location").value
            });

            const data = await api(
                "/products?" + query.toString()
            );

            $("#products").innerHTML = data.products.length

                ? data.products.map(product => `

                    <article class="product-card">

                        <img
                            src="${esc(
                                product.imageUrl ||
                                "/assets/images/farm-hero.svg"
                            )}"
                            alt="${esc(product.cropName)}"
                            loading="lazy"
                        >

                        <div class="product-info">

                            <div class="small">
                                ${esc(product.location)}
                                · Grade ${esc(product.qualityGrade)}
                            </div>

                            <h3>${esc(product.cropName)}</h3>

                            <div class="price">
                                ${money(product.pricePerKg)}
                                <span class="small">/ kg</span>
                            </div>

                            <p class="small">
                                ${esc(
                                    product.description ||
                                    "Fresh produce from a local farmer."
                                )}
                            </p>

                            <p class="small">
                                Farmer:
                                ${esc(
                                    product.farmer?.name ||
                                    "FarmConnect farmer"
                                )}
                            </p>

                            <button
                                class="btn btn-primary full"
                                data-order="${product._id}"
                                data-name="${esc(product.cropName)}"
                            >
                                Place order
                            </button>

                        </div>

                    </article>

                `).join("")

                : `
                    <div class="empty">
                        No products found. Try another search.
                    </div>
                `;


            $("#products")
                .querySelectorAll("[data-order]")
                .forEach(button => {

                    button.onclick = () => {

                        placeOrder(
                            button.dataset.order,
                            button.dataset.name
                        );

                    };

                });

        }


        $("#find").onclick = () => {

            loadProducts().catch(error => {
                notice(body, error.message, true);
            });

        };

        await loadProducts();

    } catch (error) {

        body.innerHTML = `
            <div class="empty">
                ${esc(error.message)}
            </div>
        `;

    }

}


/* =========================================================
   PLACE ORDER
========================================================= */

async function placeOrder(id, name) {

    const quantity = prompt(
        `How many kg of ${name} would you like to order?`
    );

    if (!quantity) return;

    if (
        !Number.isFinite(Number(quantity)) ||
        Number(quantity) <= 0
    ) {
        alert("Please enter a valid quantity.");
        return;
    }

    const pickupMethod = confirm(
        "Press OK for delivery, or Cancel for pickup."
    ) ? "Delivery" : "Pickup";


    try {

        const data = await api("/orders", {

            method: "POST",

            body: JSON.stringify({
                productId: id,
                quantityOrdered: Number(quantity),
                pickupMethod
            })

        });

        alert(data.message);

        customerDashboard();

    } catch (error) {

        alert(error.message);

    }

}


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

async function adminDashboard() {

    dashboardShell("admin", `

        <div class="dash-head">

            <div>

                <h1>Admin control room</h1>

                <p class="muted">
                    Monitor activity and keep the marketplace healthy.
                </p>

            </div>

        </div>

        <div id="adminBody">
            Loading platform data…
        </div>

    `);


    const view =
        new URLSearchParams(location.search).get("view")
        || "overview";

    const body = $("#adminBody");


    try {

        /* FARMER APPROVALS */

        if (view === "farmers") {

            const data = await api("/admin/farmers");

            body.innerHTML = `

                <h2>Farmer registrations</h2>

                ${
                    data.farmers.length

                    ? `

                        <div class="table-wrap">

                            <table>

                                <thead>
                                    <tr>
                                        <th>Farmer</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Location</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    ${data.farmers.map(farmer => `

                                        <tr>

                                            <td>${esc(farmer.name)}</td>
                                            <td>${esc(farmer.email)}</td>
                                            <td>${esc(farmer.phone)}</td>
                                            <td>${esc(farmer.address)}</td>

                                            <td>
                                                <span class="pill ${
                                                    farmer.approvalStatus === "pending"
                                                    ? "pending"
                                                    : ""
                                                }">
                                                    ${esc(farmer.approvalStatus)}
                                                </span>
                                            </td>

                                            <td>

                                                ${
                                                    farmer.approvalStatus === "pending"

                                                    ? `
                                                        <button
                                                            class="btn btn-primary"
                                                            data-approve="${farmer._id}"
                                                        >
                                                            Approve
                                                        </button>
                                                    `

                                                    : "—"
                                                }

                                            </td>

                                        </tr>

                                    `).join("")}

                                </tbody>

                            </table>

                        </div>

                    `

                    : `
                        <div class="empty">
                            No farmer registrations yet.
                        </div>
                    `
                }

            `;


            body.querySelectorAll("[data-approve]")
                .forEach(button => {

                    button.onclick = async () => {

                        button.disabled = true;

                        try {

                            await api(
                                `/admin/farmers/${button.dataset.approve}/approve`,
                                {
                                    method: "PATCH",
                                    body: "{}"
                                }
                            );

                            adminDashboard();

                        } catch (error) {

                            button.disabled = false;

                            body.insertAdjacentHTML(
                                "afterbegin",
                                `<div class="form-message error">${esc(error.message)}</div>`
                            );

                        }

                    };

                });

            return;

        }


        /* PRODUCT MODERATION */

        if (view === "products") {

            const data = await api("/products");

            body.innerHTML = `
                <h2>Active marketplace listings</h2>
                ${productTable(data.products, false, true)}
            `;


            body.querySelectorAll("[data-delete]")
                .forEach(button => {

                    button.onclick = async () => {

                        if (!confirm("Remove this listing?")) {
                            return;
                        }

                        button.disabled = true;

                        try {

                            await api(
                                `/admin/products/${button.dataset.delete}`,
                                { method: "DELETE" }
                            );

                            adminDashboard();

                        } catch (error) {

                            button.disabled = false;

                            body.insertAdjacentHTML(
                                "afterbegin",
                                `<div class="form-message error">${esc(error.message)}</div>`
                            );

                        }

                    };

                });

            return;

        }


        /* ADMIN OVERVIEW */

        const data = await api("/admin/summary");

        const summary = data.summary;

        body.innerHTML = `

            <div class="stats">

                <div class="stat-card">
                    <span>Approved farmers</span>
                    <strong>${summary.farmers}</strong>
                </div>

                <div class="stat-card">
                    <span>Customers</span>
                    <strong>${summary.customers}</strong>
                </div>

                <div class="stat-card">
                    <span>Active products</span>
                    <strong>${summary.products}</strong>
                </div>

                <div class="stat-card">
                    <span>Total orders</span>
                    <strong>${summary.orders}</strong>
                </div>

            </div>


            <div class="feature-band">

                <div>

                    <span class="eyebrow">
                        Needs attention
                    </span>

                    <h2>
                        ${summary.pendingFarmers}
                        farmer approvals pending
                    </h2>

                    <p>
                        Review new farmer registrations before
                        they can access their selling dashboard.
                    </p>

                </div>

                <a
                    class="btn btn-lime"
                    href="/admin/dashboard?view=farmers"
                >
                    Review farmers →
                </a>

            </div>


            <div class="panel" style="margin-top:18px">

                <span class="small">
                    Completed order value
                </span>

                <h2>${money(summary.revenue)}</h2>

                <p class="muted small">
                    Calculated from completed orders.
                    No payment gateway is connected.
                </p>

            </div>

        `;

    } catch (error) {

        body.innerHTML = `
            <div class="empty">
                ${esc(error.message)}
            </div>
        `;

    }

}


/* =========================================================
   PRODUCT TABLE
========================================================= */

function productTable(products, owner, admin = false) {

    if (!products.length) {

        return `
            <div class="empty">
                No products listed yet.
            </div>
        `;

    }

    return `

        <div class="table-wrap">

            <table>

                <thead>

                    <tr>
                        <th>Product</th>
                        <th>Price / kg</th>
                        <th>Available</th>
                        <th>Location</th>
                        <th>Action</th>
                    </tr>

                </thead>


                <tbody>

                    ${products.map(product => `

                        <tr>

                            <td>${esc(product.cropName)}</td>

                            <td>${money(product.pricePerKg)}</td>

                            <td>${esc(product.quantityAvailable)} kg</td>

                            <td>${esc(product.location)}</td>

                            <td>

                                ${
                                    owner || admin

                                    ? `
                                        <button
                                            class="btn btn-light"
                                            data-delete="${product._id}"
                                        >
                                            Delete
                                        </button>
                                    `

                                    : "—"
                                }

                            </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        </div>

    `;

}


/* =========================================================
   ORDER TABLE
========================================================= */

function orderTable(orders, farmer) {

    if (!orders.length) {

        return `
            <div class="empty">
                No orders to show yet.
            </div>
        `;

    }

    return `

        <div class="table-wrap">

            <table>

                <thead>

                    <tr>
                        <th>Product</th>
                        <th>${farmer ? "Customer" : "Farmer"}</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Status</th>

                        ${farmer ? "<th>Update</th>" : ""}

                    </tr>

                </thead>


                <tbody>

                    ${orders.map(order => `

                        <tr>

                            <td>
                                ${esc(order.product?.cropName || "Product")}
                            </td>

                            <td>
                                ${esc(
                                    farmer
                                    ? order.buyer?.name
                                    : order.farmer?.name
                                )}
                            </td>

                            <td>
                                ${esc(order.quantityOrdered)} kg
                            </td>

                            <td>
                                ${money(order.totalPrice)}
                            </td>

                            <td>

                                <span class="pill ${esc(
                                    String(order.status || "").toLowerCase()
                                )}">
                                    ${esc(order.status)}
                                </span>

                            </td>


                            ${
                                farmer

                                ? `
                                    <td>

                                        ${
                                            order.status === "Pending"

                                            ? `
                                                <button
                                                    class="btn btn-light"
                                                    data-id="${order._id}"
                                                    data-status="Accepted"
                                                >
                                                    Accept
                                                </button>
                                            `

                                            : order.status === "Accepted"

                                            ? `
                                                <button
                                                    class="btn btn-primary"
                                                    data-id="${order._id}"
                                                    data-status="Completed"
                                                >
                                                    Complete
                                                </button>
                                            `

                                            : "—"
                                        }

                                    </td>
                                `

                                : ""
                            }

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        </div>

    `;

}


/* =========================================================
   APPLICATION ROUTING
========================================================= */

async function route() {

    if (path === "/") {
        home();
        return;
    }


    const parts = path.split("/").filter(Boolean);

    const role = parts[0];
    const page = parts[1];


    if (!["farmer", "customer", "admin"].includes(role)) {

        home();
        return;

    }


    /* LOGIN AND REGISTRATION */

    if (page === "login" || page === "register") {

        if (page === "register" && role === "admin") {

            location.href = "/admin/login";
            return;

        }

        authPage(role, page);
        return;

    }


    /* DASHBOARDS */

    if (page === "dashboard") {

        const user = getUser();

        if (
            !getToken() ||
            !user ||
            user.role !== role
        ) {

            location.href = `/${role}/login`;
            return;

        }


        try {

            const data = await api("/auth/me");

            if (data.user.role !== role) {

                logout();
                return;

            }

        } catch {

            logout();
            return;

        }


        if (role === "farmer") {
            return farmerDashboard();
        }

        if (role === "customer") {
            return customerDashboard();
        }

        return adminDashboard();

    }


    location.href = `/${role}/login`;

}


/* =========================================================
   START APPLICATION
========================================================= */

route();
