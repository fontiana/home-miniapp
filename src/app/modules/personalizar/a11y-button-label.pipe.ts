import { Pipe, PipeTransform } from '@angular/core';
import { Card } from './personalizar.component';

type ButtonLabelData = Partial<Card> & {
  selected?: boolean;
  matriz?: number; // Quantidade botões por linha
  index?: number;
  size?: number;
  sectionTitle?: string;
};

@Pipe({
  name: 'a11yButtonLabel',
})
export class A11yPipeButtonLabel implements PipeTransform {
  constructor() {}

  transform(data: ButtonLabelData, ...args: unknown[]) {
    const emptyLabel = '';

    if (!data || !data.title) return emptyLabel;

    const { id, news, selected, title, index, size, matriz, sectionTitle } =
      data;

    let label = title;

    // Trativa para exceções de titulos
    switch (id) {
      case 'ver-mais':
        label = sectionTitle ? `${title} ${sectionTitle}` : title;
        break;
    }

    // Cria a composição para formar o label para o card
    const labelComposition: string[] = [`${label}.`];

    // Adiciona a posição do item na lista caso receba o index e tamanho
    if (index !== undefined && size !== undefined && !Boolean(matriz)) {
      labelComposition.push(`Item ${index + 1} de ${size}.`);
    }

    // Adiciona leitura de matriz para o index
    if (matriz && matriz > 0 && index !== undefined) {
      const row = Math.floor(index / matriz + 1);
      const column = (index % matriz) + 1;

      labelComposition.push(`Linha ${row} de coluna ${column}.`);
    }

    // Adiciona a tag de novo caso seja verdadeiro
    if (Boolean(news)) labelComposition.push('Novo.');

    // Adiciona a tag de selecionado ou não baseado na propriedade selected (Se for undefined, não adiciona)
    if (selected === true) labelComposition.push('Selecionado.');
    if (selected === false) labelComposition.push('Não selecionado.');

    return labelComposition.join(' ').trim();
  }
}
