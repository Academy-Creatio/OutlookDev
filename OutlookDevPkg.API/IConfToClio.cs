using Terrasoft.Core;

namespace OutlookDevPkg.API
{
	public interface IConfToClio
	{
		void PostMessage(UserConnection userConnection, string senderName, string messageText);
		void PostMessageToAll(string senderName, string messageText);
	}
}
