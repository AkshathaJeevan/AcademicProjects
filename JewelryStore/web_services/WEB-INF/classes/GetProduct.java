import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

import sdsu.*;
import helpers.*;

public class GetProduct extends HttpServlet {


    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    HttpSession session = request.getSession(false);
    if(session == null) {
        ServletContext context = getServletContext();
        RequestDispatcher dispatcher
            = request.getRequestDispatcher("/jsp/login_err.jsp");
        dispatcher.forward(request, response);
        }
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();

    String sku = request.getParameter("sku"); 
    Vector<String []> answer = DBHelper.doQuery("SELECT * FROM inventories WHERE sku='"+ sku +"'");

    String finalString="";
    for(int i=0; i < answer.size(); i++) {
        String [] tmp = answer.elementAt(i);
        for(int j=0; j < tmp.length; j++)
                finalString = finalString + tmp[j] + "|";

        }
    response.getWriter().write(finalString);

    }

    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
        doGet(request, response);
    }
}
