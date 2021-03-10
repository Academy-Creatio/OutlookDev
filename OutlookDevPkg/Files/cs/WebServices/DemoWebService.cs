using System;
using System.Data;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using Terrasoft.Common;
using Terrasoft.Core;
using Terrasoft.Core.DB;
using Terrasoft.Web.Common;

namespace OutlookDevPkg
{
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class DemoWebService : BaseService
	{
		#region Properties
		private SystemUserConnection _systemUserConnection;
		private SystemUserConnection SystemUserConnection
		{
			get
			{
				return _systemUserConnection ?? (_systemUserConnection = (SystemUserConnection)AppConnection.SystemUserConnection);
			}
		}
		#endregion

		#region Methods : REST
		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest,
			ResponseFormat = WebMessageFormat.Json)]
		public string PostMethodName(Person p, string name)
		{
			UserConnection userConnection = UserConnection ?? SystemUserConnection;
			return p.Name + " | "+ name;
		}

		[OperationContract]
		[WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, 
			BodyStyle = WebMessageBodyStyle.WrappedRequest, ResponseFormat = WebMessageFormat.Json)]
		public Person GetMethodname(string name)
		{
			UserConnection userConnection = UserConnection ?? SystemUserConnection;
			Select select = new Select(UserConnection)
				.Column("Name")
				.Column("Email")
				.From("Contact")
				.Where("Email").IsEqual(Column.Parameter(name)) as Select;


			using(DBExecutor dBExecutor = UserConnection.EnsureDBConnection(Terrasoft.Common.QueryKind.General))
			{
				using (IDataReader reader = select.ExecuteReader(dBExecutor))
				{
					DataTable dt = reader.ReadToDataTable("Contact");
					var pName = (string)dt.Rows[0]["Name"];
					var pEmail = (string)dt.Rows[0]["Email"];
					Person p = new Person
					{
						Name = pName,
						Email = pEmail
					};
					return p;
				}
			}
		}

		#endregion

		#region Methods : Private

		#endregion
	}


	[DataContract]
	public class Person
	{
		[DataMember(Name = "NameAttribute")]
		public string Name { get; set; }

		[DataMember(Name ="Email")]
		public string Email { get; set; }
	}
}



