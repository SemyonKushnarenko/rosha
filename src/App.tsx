import './App.css'
import AnimatedCursor from 'react-animated-cursor';
import TableComponent from './shared/components/Table/TableComponent';
import TableDescription from './shared/components/Table/TableDescription';
import Button from './shared/components/Button/Button';
import { useState } from 'react';
import { ModeEnum } from './shared/constants/modes';
import useTable from './shared/hooks/useTable';
import { createPortal } from 'react-dom';
import Modal from './shared/components/Modal/Modal';

function App() {
  const [mode, setMode] = useState<`${ModeEnum}`>(ModeEnum.normal);
  const {
    cols,
    table,
    asyncSetColumns,
    asyncSetTable,
    onToggleWorked,
    isLoading,
    newTable,
    saveTable,
    getBack,
    addRow,
    removeRow,
  } = useTable(mode);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  
  const onToggleMode = () => {
    if (mode === ModeEnum.edit) {
      return setIsOpenModal(true)
    }
    setMode(ModeEnum.edit)
  }

  const onSaveTable = () => {
    saveTable()
    setIsOpenModal(false)
    setMode(ModeEnum.normal)
  }

  const ModalPortal = createPortal(
    <Modal text='Вы уверены в сохранении?' action={onSaveTable} onClose={() => setIsOpenModal(false)} />, 
    document.body
  )

  const onGetBack = () => {
    setMode(ModeEnum.normal)
    getBack()
  }

  return (
    <main className='rosha-main'>
      <AnimatedCursor
        innerSize={9}
        outerSize={40}
        outerScale={3.7}
        outerAlpha={0.2}
        innerScale={2.5}
        color='221, 20, 5'
        clickables={['a', 'button', '.rosha-cell_editable']}
      />
      <TableDescription />
      <TableComponent 
        mode={mode}
        cols={cols} 
        table={table} 
        newTable={newTable} 
        asyncSetColumns={asyncSetColumns} 
        asyncSetTable={asyncSetTable} 
        isLoading={isLoading}
        onToggleWorked={onToggleWorked}
        addRow={addRow}
        removeRow={removeRow}
      />
      <Button onClick={onToggleMode}>
        {mode === ModeEnum.edit ? 'Сохранить' : 'Редактировать'}
      </Button>
      {
      mode === ModeEnum.edit && 
        <Button onClick={onGetBack}>
          Вернуться
        </Button>
      }
      {isOpenModal && ModalPortal}
    </main>
  )
}

export default App
