using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.SharePoint.Client;
using Microsoft.SharePoint.Client.EventReceivers;

namespace SharePointAddIn1Web.Services
{
    public class AppEventReceiver : IRemoteEventService
    {
        /// <summary>
        /// Handles app events that occur after the app is installed or upgraded, or when app is being uninstalled.
        /// </summary>
        /// <param name="properties">Holds information about the app event.</param>
        /// <returns>Holds information returned from the app event.</returns>
        public SPRemoteEventResult ProcessEvent(SPRemoteEventProperties properties)
        {
            string logListTitle = "EventLog";
            SPRemoteEventResult result = new SPRemoteEventResult();
            bool exists = false;
            using (ClientContext clientContext = TokenHelper.CreateAppEventClientContext(properties, useAppWeb: false))
            {
                if (clientContext != null)
                {
                    clientContext.Load(clientContext.Web);
                    clientContext.ExecuteQuery();
                    //List logList = clientContext.Web.Lists.GetByTitle(logListTitle);

                    //try
                    //{
                    //    clientContext.Load(logList);
                    //    clientContext.ExecuteQuery();
                    //    exists = true;
                    //}

                    //catch (Microsoft.SharePoint.Client.ServerUnauthorizedAccessException)
                    //{
                    //    // If the user doesn't have permissions to access the server that's 
                    //    // running SharePoint, return.
                    //}

                    //catch (Microsoft.SharePoint.Client.ServerException)
                    //{
                    //    // If an error occurs on the server that's running SharePoint, return.
                    //    exists = false;
                    //}

                    //// Create a log list called "EventLog" if it doesn't already exist.
                    //if (!exists)
                    //{
                    //    ListCreationInformation listInfo = new ListCreationInformation();
                    //    listInfo.Title = logListTitle;
                    //    // Create a generic custom list.
                    //    listInfo.TemplateType = 100;
                    //    clientContext.Web.Lists.Add(listInfo);
                    //    clientContext.Web.Context.ExecuteQuery();
                    //}

                    //// Add the event entry to the EventLog list.
                    //string itemTitle = "Event: " + properties.EventType.ToString() +
                    //    " occurred on: " +
                    //    DateTime.Now.ToString(" yyyy/MM/dd/HH:mm:ss:fffffff");
                    //ListCollection lists = clientContext.Web.Lists;
                    //List selectedList = lists.GetByTitle(logListTitle);
                    //clientContext.Load<ListCollection>(lists);
                    //clientContext.Load<List>(selectedList);
                    //ListItemCreationInformation listItemCreationInfo =
                    //    new ListItemCreationInformation();
                    //var listItem = selectedList.AddItem(listItemCreationInfo);
                    //listItem["Title"] = itemTitle;
                    //listItem.Update();
                    //clientContext.ExecuteQuery();
                }
            }

            return result;
        }

        /// <summary>
        /// This method is a required placeholder, but is not used by app events.
        /// </summary>
        /// <param name="properties">Unused.</param>
        public void ProcessOneWayEvent(SPRemoteEventProperties properties)
        {
            throw new NotImplementedException();
        }

    }
}
