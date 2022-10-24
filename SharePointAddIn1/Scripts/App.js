'use strict';

$(window).on("load", function () {
    var GetProjectsTypeChoices = GetListFieldProp("Project_x0020_Type1").Choices.results
    for (var index in GetProjectsTypeChoices) {
        $("#Project_Type_Field").append("<option value='" + GetProjectsTypeChoices[index] + "'>" + GetProjectsTypeChoices[index] + "</option>")
    }
});
function GetParameterFromURL(name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}

function addNewItem() {
    if ($("#Title_Field").val() != "") {
        //specify item properties
        var itemData = {
            "Title": $("#Title_Field").val(), "CategoryDescription": $("#Description_Field").val()
            , "RoutingEnabled": $("#Active_Field").is(":checked"), "Project_x0020_Type1": $("#Project_Type_Field").val()
        };
        var ListProperties = GetListInfoByGUID()
        var DefaultListView = ListProperties.DefaultView.__deferred.uri
        //create item
        CreateListItemWithDetails(ListProperties, itemData,
            function (entity) {
                CallExtenralAPI()
                GetListDefaultView(DefaultListView)
            },
            function (error) {
                console.log(JSON.stringify(error));
                GetListDefaultView(DefaultListView)
            }
        );
    } else {
        alert("The Title field is required!")
    }
}

function CreateListItemWithDetails(ListProperties, itemData, success, failure) {
    /**
     * Create new library item with metadata
     * ListProperties:Current List properties
     * itemData: The new item data, enterd by user
     * success: The function to execute if the call is sucesfull
     * failure: The function to execute if the call fails
     * */
    var item = itemData;
    //Extract the Projects Content Type id and add the set the new item with it
    var ContentTypeID = GetContentTypeByName("Projects")
    item["ContentTypeId"] = ContentTypeID
    item["__metadata"] = { "type": ListProperties.ListItemEntityTypeFullName }

    $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbyid('" + ListProperties.Id + "')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(item),
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            success(data);
        },
        error: function (data) {
            failure(data);
        }
    });
}

function GetContentTypeByName(RequestContentType) {
    /**
     * * Retrieve current list content types list
     * * */

    //Get the list GUID from url of form
    var ListGUID = GetListGUID()
    var ContentTypeId;
    CallRestApi(_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists(guid'" + ListGUID + "')/contenttypes", "GET", function (data) {
        var ContentTypeList = data.d.results;
        console.log(ContentTypeList)
        for (var index in ContentTypeList) {
            var contentType = ContentTypeList[index]
            if (contentType.Name == RequestContentType) {
                ContentTypeId = contentType.Id.StringValue
            }
        }
    }, function (data) {
        console.log(data)
    })
    return ContentTypeId
}

function GetListInfoByGUID() {
    /**
     * Retrieve a list properties such as listname,rootfolder, etc
     * */

    //Get the list GUID from url of form
    var ListGUID = GetListGUID()
    var ListInfo;
    CallRestApi(_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists(guid'" + ListGUID + "')", "GET", function (data) {
        ListInfo = data.d;
    }, function (data) {
        console.log(data)
    })
    return ListInfo
}
function GetListGUID() {
    /**
     * * Get the current list id from url and remove the {  and } symbol
     * * */
    return decodeURIComponent(GetParameterFromURL('SPListId')).replace("{", "").replace("}", "")
}
function GetListDefaultView(URL) {
    /**
     * * Redirct to default list view
     * * */
    CallRestApi(URL, "GET", function (data) {
        location.href = data.d.ServerRelativeUrl;
    }, function (data) {
        console.log(data)
    })
}
function GetListFieldProp(InternalFieldName) {
    /**
     * * Extract specific list field properties
     * * */
    //Get the list GUID from url of form
    var ListGUID = GetListGUID()
    var FieldProperties;
    CallRestApi(_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists(guid'" + ListGUID + "')/Fields?$filter=InternalName eq '" + InternalFieldName + "'", "GET", function (data) {
        console.log(data)
        FieldProperties = data.d.results[0]
    }, function (data) {
        console.log(data)
    })
    return FieldProperties
}
function CallRestApi(url, type, success, error) {
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            success(data)
        },
        error: function (data) {
            console.log(data)
            error(data)
        }
    })
}
function CancelBtn() {
    var ListGUID = GetListGUID()
    GetListDefaultView(_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists(guid'" + ListGUID + "')/DefaultView")
}

function CallExtenralAPI() {
    var itemData = {
        "Title": $("#Title_Field").val(), "Description": $("#Description_Field").val()
        , "IsActive": $("#Active_Field").is(":checked"), "ProjectType": $("#Project_Type_Field").val()
    };
    $.ajax({
        url: "https://localhost:44386/api/CreateFile",
        type: 'POST',
        async: false,
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(itemData),
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            console.log(data)
        },
        error: function (data) {
            console.log(data)
        }
    })
}

