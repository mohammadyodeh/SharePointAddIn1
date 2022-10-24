<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.5.0.min.js"></script>
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Add New Item
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div>
        <table border="0" cellpadding="0" cellspacing="0" width="width="600px"" style="margin-top: 8px;">
            <tbody>
                <tr>
                    <td nowrap="true" valign="top" width="50px">
                        <span id="Title">
                            <nobr>Title<span class="ms-accentText" title="This is a required field."> *</span></nobr>

                        </span>

                    </td>
                    <td valign="top" width="100px" class="ms-formbody">

                        <span >
                            <input requird="required" type="text" value="" maxlength="255" id="Title_Field" title="Title Required Field" /></span>
                    </td>
                </tr>
                <tr>
                    <td nowrap="true" valign="top" width="50px">
                        <span id="Description">
                            <nobr>Description</nobr>

                        </span>

                    </td>
                    <td valign="top" width="100px" class="ms-formbody">

                        <span>
                            <textarea  type="text" value="" maxlength="255" id="Description_Field"  style="width: 299px; height: 65px;"></textarea></span>
                    </td>
                </tr>
                <tr>
                    <td valign="top" width="50px">
                        <span id="Active">
                            <nobr>Active</nobr>

                        </span>

                    </td>
                    <td  width="100px" class="ms-formbody">

                        <span>
                            <input type="checkbox" id="Active_Field"/></span>
                    </td>
                </tr>
                <tr>
                    <td width="50px">
                        <span id="Project_Type">
                            <nobr>Project Type</nobr>

                        </span>

                    </td>
                    <td valign="top" width="100px" class="ms-formbody">
                        <span>
                            <select id="Project_Type_Field" style=" width: 150px;">
 
                            </select>

                        </span>
                    </td>
                </tr>
                <tr>
                    <td><input type="button" value="Save" onclick="addNewItem()" id="Save_Btn" target="_self"/></td>
                    <td><input type="button" value="Cancel" onclick="CancelBtn()" id="Cancel_Btn" target="_self"/></td>
                </tr>
            </tbody>
        </table>
    </div>

</asp:Content>
