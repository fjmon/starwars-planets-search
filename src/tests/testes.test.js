import React from "react";
import { screen, render } from "@testing-library/react";
import App from '../App';
import planetListAPI from './planetListAPI';
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(planetListAPI)
  }))
})

describe ('Requisição de API', () => {
  it('Verifica requisição', async() => {
    render(<App />);
    expect(await screen.findByText('Alderaan')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
  })
})

describe('Filtros', () => {
    it('Verifica os filtros', () => {
        render(<App />);
        const inputName = screen.getByTestId('name-filter')
        expect(inputName).toBeInTheDocument()
        userEvent.type(inputName, 'Tatooine')

        const column = screen.getByTestId('column-filter')
        expect(column).toBeInTheDocument()
        userEvent.selectOptions(column, 'population')

        const comparison = screen.getByTestId('comparison-filter')
        expect(comparison).toBeInTheDocument()
        userEvent.selectOptions(comparison, 'maior que')
       
        const value = screen.getByTestId('value-filter')
        expect(value).toBeInTheDocument()
        userEvent.type(value, '1000')
      })
    })

    describe('Funcão de remover filtros', () => {
      it('Verifica remoção de filtros individual', () => {
        render(<App />);    
        const button = screen.getByTestId('button-filter')
        expect(button).toBeInTheDocument()
        userEvent.click(button)
        
        const buttonRemoveFilter = screen.getByText('X')
        expect(buttonRemoveFilter).toBeInTheDocument()
        userEvent.click(buttonRemoveFilter)
      })

      it('Verifica remoção de filtros total', () => {
        render(<App />);
        const limpaFiltro = screen.getByTestId('button-remove-filters')
        expect(limpaFiltro).toBeInTheDocument()
        userEvent.click(limpaFiltro)
      })
    })
    
    describe('Operadores no componente Table', () => {
        it('Verifica operador "maior que "', async () => {
            render(<App />);        
            const column = screen.getByTestId('column-filter')
            expect(column).toBeInTheDocument()
            userEvent.selectOptions(column, 'diameter')
          
            const comparison1 = screen.getByTestId('comparison-filter')
            expect(comparison1).toBeInTheDocument()
            userEvent.selectOptions(comparison1, 'maior que')
          
            const value = screen.getByTestId('value-filter')
            expect(value).toBeInTheDocument()
            userEvent.type(value, '1000')
          
            const button = screen.getByTestId('button-filter')
            expect(button).toBeInTheDocument()
            userEvent.click(button)
        
            const resultFilter = await screen.findByText(/alderaan/i)
            expect(resultFilter).toBeInTheDocument()
        })
      
          it('Verifica operador "menor que "', async() => {
            render(<App />);
            const column = screen.getByTestId('column-filter')
            expect(column).toBeInTheDocument()
            userEvent.selectOptions(column, 'surface_water')

            const comparison = screen.getByTestId('comparison-filter')
            expect(comparison).toBeInTheDocument()
            userEvent.selectOptions(comparison, 'menor que')

            const value = screen.getByTestId('value-filter')
            expect(value).toBeInTheDocument()
            userEvent.type(value, '1000')
          
            const button = screen.getByTestId('button-filter')
            expect(button).toBeInTheDocument()
            userEvent.click(button)

            const resultFilter = await screen.findByText(/alderaan/i)
            expect(resultFilter).toBeInTheDocument()
          })
          
          it('Verifica operador "igual a "', async () => {
            render(<App />);
            const column = screen.getByTestId('column-filter')
            expect(column).toBeInTheDocument()
            userEvent.selectOptions(column, 'surface_water')
            
            const comparison = screen.getByTestId('comparison-filter')
            expect(comparison).toBeInTheDocument()
            userEvent.selectOptions(comparison, 'igual a')

            const value = screen.getByTestId('value-filter')
            expect(value).toBeInTheDocument()
            userEvent.type(value, '1000')
          
            const button = screen.getByTestId('button-filter')
            expect(button).toBeInTheDocument()
            userEvent.click(button)

            const resultFilter = await screen.findByText(/tatooine/i)
            expect(resultFilter).toBeInTheDocument()
          })
      })
