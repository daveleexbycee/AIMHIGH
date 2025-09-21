import fetch from 'node-fetch';

const ONE_SIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
const ONE_SIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;

export async function sendFulfilledNotification(userId: string, orderId: string) {
  if (!ONE_SIGNAL_APP_ID || !ONE_SIGNAL_REST_API_KEY) {
    console.error("OneSignal App ID or REST API Key is not configured.");
    return;
  }

  const notification = {
    app_id: ONE_SIGNAL_APP_ID,
    include_external_user_ids: [userId],
    headings: { en: "Order Delivered 🎉" },
    contents: { en: `Your order #${orderId} has been delivered!` },
    name: `ORDER_FULFILLED_${orderId}`
  };

  try {
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${ONE_SIGNAL_REST_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notification),
    });

    const data = await response.json();
    console.log("OneSignal notification response:", data);
  } catch (error) {
    console.error("Error sending OneSignal notification:", error);
  }
}

export async function sendShippingNotification(userId: string, orderId: string) {
    if (!ONE_SIGNAL_APP_ID || !ONE_SIGNAL_REST_API_KEY) {
      console.error("OneSignal App ID or REST API Key is not configured.");
      return;
    }
  
    const notification = {
      app_id: ONE_SIGNAL_APP_ID,
      include_external_user_ids: [userId],
      headings: { en: "Your Order is on the Way! 🚚" },
      contents: { en: `Your order #${orderId} has been shipped and is out for delivery!` },
      name: `ORDER_SHIPPED_${orderId}`
    };
  
    try {
      const response = await fetch("https://onesignal.com/api/v1/notifications", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${ONE_SIGNAL_REST_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notification),
      });
  
      const data = await response.json();
      console.log("OneSignal shipping notification response:", data);
    } catch (error) {
      console.error("Error sending OneSignal shipping notification:", error);
    }
  }