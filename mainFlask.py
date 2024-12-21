from flask import Flask
from data.database import Database
import os
class MainFlask:
    """
    Clase donde se inicializa flask y la base de datos
    """
    app=None
    database=None

    @classmethod
    def getFlask(cls):
        """
        Método de clase que
        inicializa flask si no está inicializado

        Agrs:
            atributos estáticos
        """
        if cls.app is None:
            #static_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')
            static_folder ='static'
            #template_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
            template_folder ='templates'
            print("la ruta de los archivos estaticos es: ", static_folder)
            cls.app = Flask('__main__', static_folder=static_folder, template_folder=template_folder)
            #cls.app = Flask('__main__')
            cls.app.secret_key = "mi secret key"
        return cls.app

    @classmethod
    def get_database(cls):
        """
        Método de clase que inicializa la base de datos si no está inicializada
        
        Args:
            Atributos estáticos
        """
        if cls.database is None:
            cls.database = Database()
        return cls.database


